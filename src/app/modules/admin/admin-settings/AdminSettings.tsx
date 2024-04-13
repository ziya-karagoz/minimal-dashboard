import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IAdminResponseP } from "../core/models/admin.interface";
import { getAdmin } from "../core/api/admin.request";
import Loader from "@base/layout/components/loader/Loader";
import moment from "@base/helpers/enhencers/Moment";
import toast from "react-hot-toast";
import Avatar from "@base/components/common/avatars/Avatar";
import { IAdminRole } from "@app/core/models/app.models";
import { ERole } from "@base/enums/role.enum";
import {
    getAdminRoles,
    getAllAdminRoles,
    updateAdminRoles,
} from "@app/core/api/app.requests";
import { useDebounce } from "@uidotdev/usehooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@base/components/common/buttons/Button";
import { FetchStatus } from "@base/enums/api.enum";

const AdminSettings = () => {
    const navigate = useNavigate();
    const { id: adminId } = useParams();
    const [roleSearch, setRoleSearch] = useState<string>("");
    const debouncedRoleSearch = useDebounce(roleSearch, 500);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);

    const [updateStatus, setUpdateStatus] = useState<FetchStatus>(
        FetchStatus.IDLE
    );
    const [allRoles, setAllRoles] = useState<IAdminRole[]>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [selectedRoles, setSelectedRoles] = useState<ERole[]>([]);
    const [admin, setAdmin] = useState<IAdminResponseP | null>(null);
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.IDLE);
    const [adminRoles, setAdminRoles] = useState<ERole[] | null>(null);

    useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        getAdminRoles(parseInt(adminId!)).then((res) => {
            setAdminRoles(res);
            setFetchStatus(FetchStatus.SUCCEEDED);
        });
        getAdmin(parseInt(adminId!)).then((res) => {
            setAdmin(res);
        });
    }, [adminId]);

    useEffect(() => {
        if (initialLoad && adminRoles?.length && allRoles?.length) {
            // set the selectedRoles at initial if adminRoles has it
            const newArr = allRoles.filter((role) => adminRoles.includes(role.name));
            setSelectedRoles(newArr.map((role) => role.name));
            setInitialLoad(false);
        }
    }, [adminRoles, initialLoad, allRoles]);

    useEffect(() => {
        getAllAdminRoles({ search: debouncedRoleSearch }).then((res) => {
            setAllRoles(res);
        });
    }, [debouncedRoleSearch]);

    const handleRoleChange = (role: ERole, isChecked: boolean) => {
        if (isChecked) {
            setSelectedRoles((prevRoles) => [...prevRoles, role]);
        } else {
            setSelectedRoles((prevRoles) => prevRoles.filter((r) => r !== role));
        }
    };

    const handleSelectAll = (isChecked: boolean) => {
        setAllSelected(isChecked);
        if (isChecked) {
            // Yeni seçilen rolleri mevcut seçilen rollere ekleyin
            const newSelectedRoles = [...new Set([...selectedRoles, ...allRoles.map((role) => role.name)])];
            setSelectedRoles(newSelectedRoles);
        } else {
            // Aramada görünen rolleri seçilen rollerden çıkarın
            const remainingRoles = selectedRoles.filter((role) => !allRoles.map((role) => role.name).includes(role as string));
            setSelectedRoles(remainingRoles);
        }
    };

    const handleSaveRoles = () => {
        // Burada API çağrısı yaparak rolleri güncelleyebilirsiniz.
        setUpdateStatus(FetchStatus.LOADING);
        updateAdminRoles({
            id: parseInt(adminId!),
            data: {
                roles: selectedRoles,
            },
        })
            .then(() => {
                setUpdateStatus(FetchStatus.SUCCEEDED);
                toast.success("Roller başarıyla güncellendi");
                navigate(-1);
            })
            .catch((error) => {
                setUpdateStatus(FetchStatus.FAILED);
                toast.error("Roller güncellenirken bir hata oluştu");
                console.error(error);
            });
    };

    if (fetchStatus !== FetchStatus.SUCCEEDED && !allRoles?.length)
        return <Loader isComponent />;

    return (
        <div>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 relative h-[calc(100vh-8rem)] overflow-auto fancy-scrollbar pr-2">
                <aside className="md:sticky md:top-6 flex flex-col w-[32%] max-md:ml-0 max-md:w-full ">
                    <div className=" flex flex-col justify-center items-center px-5 pt-5 w-full text-base font-semibold leading-4 bg-white rounded-xl border border-solid shadow-sm border-slate-200 border-opacity-70 max-md:mt-8">
                        <div className="justify-center px-1.5 py-1 text-xs text-center text-white whitespace-nowrap bg-rose-500 rounded-[800px]">
                            {admin?.account_status === true ? "Aktif" : "Pasif"}
                        </div>
                        <div className="mt-6 text-center leading-[140%] text-neutral-800">
                            {admin?.first_name} {admin?.last_name}
                        </div>
                        <div className="justify-center px-1.5 py-1 mt-6 text-center ">
                            <Avatar
                                alt="avatar"
                                src={admin?.image}
                                size="lg"
                                initial={
                                    admin?.first_name.charAt(0)! + admin?.last_name.charAt(0)
                                }
                            />
                        </div>
                        <div className="justify-center px-1.5 py-1 mt-6 text-center text-white whitespace-nowrap bg-red-600 rounded-md">
                            {admin?.email}
                        </div>
                        {admin?.phone && (
                            <div className="justify-center px-1.5 py-1.5 mt-4 text-center text-black rounded-md bg-slate-500 bg-opacity-10">
                                {admin?.phone}
                            </div>
                        )}
                        <div className="justify-center items-start self-stretch px-5 py-6 mt-5 text-xs leading-4 text-gray-400 bg-white rounded-none border-t border-solid border-slate-200 border-opacity-70 max-md:px-5">
                            Oluşturulma tarihi:{" "}
                            {moment(admin?.created_at).format("DD MMMM YYYY HH:mm:ss")}
                        </div>
                    </div>
                    <div className="flex justify-around mt-5 gap-2">
                        <Button onClick={() => navigate(-1)} color="gray">Geri</Button>
                        <Button
                            loader={updateStatus === FetchStatus.LOADING}
                            color="red"
                            onClick={handleSaveRoles}
                            disabled={updateStatus === FetchStatus.LOADING}
                        >
                            Tamam
                        </Button>
                    </div>
                </aside>
                <main className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
                        <div className="flex justify-between items-center mb-5">
                            <div className="max-w-md">
                                <label
                                    htmlFor="default-search"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <Icon
                                            className="w-4 h-4 text-gray-500"
                                            icon="mingcute:search-line"
                                        />
                                    </div>
                                    <input
                                        value={roleSearch}
                                        onChange={(e) => setRoleSearch(e.target.value)}
                                        type="search"
                                        id="default-search"
                                        className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500"
                                        placeholder="Yetki Ara"
                                    />
                                </div>
                            </div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={allSelected}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full  peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900">
                                    Tümünü Seç
                                </span>
                            </label>
                        </div>
                        <div className="flex gap-0 text-xs font-semibold leading-5 uppercase whitespace-nowrap text-slate-500 max-md:flex-wrap max-md:max-w-full">
                            <div className="grow justify-center items-start px-3 py-5 border-t border-b-2 border-solid border-slate-200 border-opacity-70 w-fit max-md:pr-5 max-md:max-w-full">
                                Yetki
                            </div>
                            <div className="justify-center items-start px-3 py-5 border-t border-b-2 border-solid border-slate-200 border-opacity-70 max-md:pr-5">
                                Aktiflik
                            </div>
                        </div>
                        {allRoles?.length ? (
                            allRoles.map((row, index) => (
                                <div
                                    className="flex gap-0 max-md:flex-wrap max-md:max-w-full"
                                    key={index}
                                >
                                    <div className="grow flex justify-between items-start px-3 py-6 border-solid border-y-[0.8px] border-b-zinc-200 text-sm leading-6 text-slate-500 w-fit max-md:pr-5 max-md:max-w-full">
                                        <div className="flex flex-col w-full md:w-1/2">
                                            <p className="text-sm text-gray-600">{row.description}</p>
                                        </div>
                                        <label className="inline-flex items-center cursor-pointer ">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={selectedRoles.includes(row.name)}
                                                onChange={(e) =>
                                                    handleRoleChange(row.name, e.target.checked)
                                                }
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                        </label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center w-full h-40 text-lg font-light text-gray-400">
                                Yetki bulunamadı
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminSettings;
