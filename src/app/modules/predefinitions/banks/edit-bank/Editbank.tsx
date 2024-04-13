import Card from "@base/components/common/cards/Card";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import { getBank, updateBank } from "../core/api/bank.requests";
import { IBankResponseP } from "../core/models/bank.interface";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Banka adı zorunludur"),
});

const EditBank = () => {
    const { id: bankId } = useParams();
    const [bank, setBank] = React.useState<IBankResponseP | null>(null);
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(FetchStatus.IDLE);

    useEffect(() => {
        if (bankId) {
            setFetchStatus(FetchStatus.LOADING);
            getBank(parseInt(bankId)).then((res) => {
                setBank(res);
                setFetchStatus(FetchStatus.SUCCEEDED);
            });
        }
    }, [bankId]);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: bank?.name || "",
        } as IBankResponseP,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            updateBank({ id: parseInt(bankId!), data: values }).then(() => {
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
                    <h4 className="text-lg text-gray-800 font-bold">{bank?.name} Bankaünü Düzenle</h4>
                </Card.Header>
                <Card.Body>
                    <div className="max-w-2xl mx-auto">


                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Adı
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="Örnek: Ziraat Bankası"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.name}
                                </p>
                            )}
                        </div>


                        {/* //! there is no such thing like active, status etc. that comes from backend, so this toggle is in comment line*/}
                        {/* <div className="mb-3">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input type="checkbox" value="" className="sr-only peer" checked={formik.values.active} onChange={formik.handleChange} id="active" name="active" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">Aktiflik Durumu</span>
                            </label>
                        </div> */}
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

export default EditBank;
