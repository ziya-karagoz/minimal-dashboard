import Card from "@base/components/common/cards/Card";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import * as Yup from "yup";
import { IUserSettingResponseP } from "../../core/models/settings.interface";
import { getUserSetting, updateUserSetting } from "../../core/api/settings.request";

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Sektör adı zorunludur"),
    description: Yup.string().required("Sektör açıklaması zorunludur"),
});

const EditUserSetting = () => {
    const { id: userSettingId } = useParams();
    const [sector, setSector] = React.useState<IUserSettingResponseP | null>(null);
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);

    useEffect(() => {
        if (userSettingId) {
            setFetchStatus(FetchStatus.LOADING);
            getUserSetting(parseInt(userSettingId)).then((res) => {
                setSector(res);
                setFetchStatus(FetchStatus.SUCCEEDED);
            });
        }
    }, [userSettingId]);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: sector?.title || "",
            is_new: sector?.is_new || false,
            description: sector?.description || "",
        } as IUserSettingResponseP,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            updateUserSetting({ id: parseInt(userSettingId!), data: values }).then(() => {
                toast.success("Kullanıcı başarıyla güncellendi");
                navigate(-1);
            });
        },
    });


    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />;

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <Card.Header>
                    <h4 className="text-lg text-gray-800 font-bold">{sector?.title} Kullanıcı Ayarını Düzenle</h4>
                </Card.Header>
                <Card.Body>
                    <div className="max-w-2xl mx-auto">


                        <div className="mb-3">
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Adı
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="Örnek: SMS Bildirimleri"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.title}
                                </p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Açıklaması
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.description}
                                </p>
                            )}
                        </div>

                        {/* active */}
                        <div className="mb-3">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input type="checkbox" value="" className="sr-only peer" checked={formik.values.is_new} onChange={formik.handleChange} id="is_new" name="is_new" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">Yeni mi?</span>
                            </label>
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer floating>
                    <div className="flex justify-center items-center gap-2">
                        <button
                            type="submit"
                            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Kaydet
                        </button>
                        <button
                            type="reset"
                            onClick={() => navigate(-1)}
                            className="text-gray-900 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            İptal
                        </button>
                    </div>
                </Card.Footer>
            </Card>
        </form>
    );
};

export default EditUserSetting;
