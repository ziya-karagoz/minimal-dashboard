import Card from "@base/components/common/cards/Card";
import { useFormik } from "formik";
import { IUserResponseP, IUserUpdateRequest } from "../core/models/user.interface";
import * as Yup from "yup";
import ReactPhoneInput from "@base/components/common/inputs/PhoneInput";
import DatePicker from "@base/components/common/date-picker/DatePicker";
import React, { useEffect } from "react";
import ImagePicker from "@base/components/common/image-picker/ImagePicker";
import { getUser, updateUser } from "../core/api/user.request";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";

const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("İsim alanı zorunludur"),
    last_name: Yup.string().required("Soyisim alanı zorunludur"),
    email: Yup.string()
        .email("Geçerli bir email adresi giriniz")
        .required("Email alanı zorunludur"),
    phone: Yup.string().required("Telefon alanı zorunludur"),
    birthday: Yup.string().required("Doğum tarihi alanı zorunludur"),
    tc_or_passport: Yup.string().required("TC veya pasaport alanı zorunludur"),
});

const EditUser = () => {
    const { id: userId } = useParams();
    const [user, setUser] = React.useState<IUserResponseP | null>(null);
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);

    useEffect(() => {
        if (userId) {
            setFetchStatus(FetchStatus.LOADING);
            getUser(parseInt(userId)).then((res) => {
                setUser(res);
                setFetchStatus(FetchStatus.SUCCEEDED);
            });
        }
    }, [userId]);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            account_status: user?.account_status,
            birthday: user?.birthday,
            email: user?.email,
            first_name: user?.first_name,
            image: user?.image,
            last_name: user?.last_name,
            phone: user?.phone,
            phone_code: user?.phone_code,
            tc_or_passport: user?.tc_or_passport,
        } as IUserUpdateRequest,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateUser({ id: parseInt(userId!), data: values }).then(() => {
                toast.success("Kullanıcı başarıyla güncellendi");
                navigate("/kullanicilar");
            });
        },
    });


    if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />;

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <Card.Header>
                    <h4 className="text-lg text-gray-800 font-bold">{user?.first_name} Kullanıcısını Düzenle</h4>
                </Card.Header>
                <Card.Body>
                    <div className="max-w-2xl mx-auto">
                        {/* image */}
                        <div className="mb-3">
                            <label
                                htmlFor="tc_or_passport"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Profil Resmi
                            </label>
                            <ImagePicker value={formik.values.image} onChange={(value) => {
                                formik.setFieldValue("image", value)
                            }} />
                            {formik.touched.image && formik.errors.image && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.image}
                                </p>
                            )}
                        </div>
                        {/* tc_or_passport */}
                        <div className="mb-3">
                            <label
                                htmlFor="tc_or_passport"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                TC veya Pasaport
                            </label>
                            <input
                                type="text"
                                id="tc_or_passport"
                                name="tc_or_passport"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="12345678901"
                                value={formik.values.tc_or_passport}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.first_name && formik.errors.tc_or_passport && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.tc_or_passport}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                            <div className="mb-3">
                                <label
                                    htmlFor="first_name"
                                    className="block mb-2 text-sm font-normal text-gray-600 "
                                >
                                    Ad
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                    placeholder="John"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.first_name && formik.errors.first_name && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {formik.errors.first_name}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="last_name"
                                    className="block mb-2 text-sm font-normal text-gray-600 "
                                >
                                    Soyad
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                    placeholder="Doe"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.last_name && formik.errors.last_name && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {formik.errors.last_name}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Eposta
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="ornek@konutkonfor.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div >
                        {/* phone */}
                        <div className="mb-3">
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Telefon Numarası
                            </label>
                            <ReactPhoneInput
                                withCode
                                value={formik.values.phone}
                                name="phone"
                                onChange={(e) => {
                                    formik.setFieldValue("phone", e.target.value.phone);
                                    formik.setFieldValue("phone_code", "+" + e.target.value.phone_code);
                                }}
                                id="phone"
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.phone}
                                </p>
                            ) : null}
                        </div>


                        {/* birthday */}
                        <div className="mb-3">
                            <label
                                htmlFor="birthday"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Doğum Tarihi
                            </label>
                            <DatePicker value={formik.values.birthday} onChange={(e) => {
                                formik.setFieldValue("birthday", e.target.value);

                            }} enableTime className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5" />

                            {formik.touched.birthday && formik.errors.birthday && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.birthday}
                                </p>
                            )}
                        </div>
                        {/* account_status */}
                        <div className="mb-3">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input type="checkbox" value="" className="sr-only peer" checked={formik.values.account_status} onChange={formik.handleChange} id="account_status" name="account_status" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">Aktiflik Durumu</span>
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

export default EditUser;
