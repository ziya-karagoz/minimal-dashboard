import { FetchStatus } from "@base/enums/api.enum";
import React, { useEffect } from "react";
import { IUserResponseP, IUserSetting } from "../core/models/user.interface";
import { getUser, getUserSettings, updateUserSetting } from "../core/api/user.request";
import { useParams } from "react-router";
import Loader from "@base/layout/components/loader/Loader";
import moment from "@base/helpers/enhencers/Moment";
import toast from "react-hot-toast";
import Avatar from "@base/components/common/avatars/Avatar";
const UserSettings = () => {
    const { id: userId } = useParams();
    const [user, setUser] = React.useState<IUserResponseP | null>(null);
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );
    const [userSettings, setUserSettings] = React.useState<IUserSetting[] | null>(
        null
    );

    useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        getUserSettings(parseInt(userId!)).then((res) => {
            setUserSettings(res.settings);
            setFetchStatus(FetchStatus.SUCCEEDED);
        });
    }, [userId]);

    useEffect(() => {
        getUser(parseInt(userId!)).then((res) => {
            setUser(res);
        });
    }, [userId]);

    function handleSetetingChange(id: number) {
        updateUserSetting({
            userId: parseInt(userId!),
            settingId: id
        }).then(() => {
            toast.success("Ayar başarıyla güncellendi.");
            getUserSettings(parseInt(userId!)).then((res) => {
                setUserSettings(res.settings);
            });
        });
    }

    if (fetchStatus !== FetchStatus.SUCCEEDED && !userSettings?.length) return <Loader isComponent />

    return (
        <div>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <aside className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full md:min-h-screen relative">
                    <div className="sticky top-9 flex flex-col justify-center items-center px-5 pt-5 w-full text-base font-semibold leading-4 bg-white rounded-xl border border-solid shadow-sm border-slate-200 border-opacity-70 max-md:mt-8">
                        <div className="justify-center px-1.5 py-1 text-xs text-center text-white whitespace-nowrap bg-rose-500 rounded-[800px]">
                            {user?.account_status === true ? "Aktif" : "Pasif"}
                        </div>
                        <div className="mt-6 text-center leading-[140%] text-neutral-800">
                            {user?.first_name} {user?.last_name}
                        </div>
                        <div className="justify-center px-1.5 py-1 mt-6 text-center ">
                            <Avatar alt="avatar" src={user?.image} size="lg" initial={user?.first_name.charAt(0)! + user?.last_name.charAt(0)} />
                        </div>
                        <div className="justify-center px-1.5 py-1 mt-6 text-center text-white whitespace-nowrap bg-red-600 rounded-md">
                            {user?.email}
                        </div>
                        <div className="justify-center px-1.5 py-1.5 mt-4 text-center text-black rounded-md bg-slate-500 bg-opacity-10">
                            {user?.phone}
                        </div>
                        <div className="justify-center items-start self-stretch px-5 py-6 mt-5 text-xs leading-4 text-gray-400 bg-white rounded-none border-t border-solid border-slate-200 border-opacity-70 max-md:px-5">
                            Oluşturulma tarihi: {moment(user?.created_at).format("DD MMMM YYYY HH:mm:ss")}
                        </div>
                    </div>
                </aside>
                <main className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
                        <div className="flex gap-0 text-xs font-semibold leading-5 uppercase whitespace-nowrap text-slate-500 max-md:flex-wrap max-md:max-w-full">
                            <div className="grow justify-center items-start px-3 py-5 border-t border-b-2 border-solid border-slate-200 border-opacity-70 w-fit max-md:pr-5 max-md:max-w-full">
                                Yetki
                            </div>
                            <div className="justify-center items-start px-3 py-5 border-t border-b-2 border-solid border-slate-200 border-opacity-70 max-md:pr-5">
                                Aktiflik
                            </div>
                        </div>
                        {userSettings?.length && userSettings.map((row, index) => (
                            <div className="flex gap-0 max-md:flex-wrap max-md:max-w-full" key={index}>

                                <div className="grow flex justify-between items-start px-3 py-6 border-solid border-y-[0.8px] border-b-zinc-200 text-sm leading-6 text-slate-500 w-fit max-md:pr-5 max-md:max-w-full">
                                    <div className="flex flex-col w-full md:w-1/2">
                                        <p className="text-sm text-gray-600">{row.setting.title}</p>
                                        <p className="text-xs text-gray-400">{row.setting.description}</p>
                                    </div>
                                    <label className="inline-flex items-center cursor-pointer ">
                                        <input type="checkbox" value="" className="sr-only peer" checked={row.active} onChange={(_) => { handleSetetingChange(row.id) }} />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                    </label>
                                </div>

                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserSettings;