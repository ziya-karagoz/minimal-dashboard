import Card from "@base/components/common/cards/Card";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import { getStep, updateStep } from "../core/api/step.requests";
import { IStepResponseP } from "../core/models/step.interface";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Adım adı zorunludur"),
    description: Yup.string().required("Adım açıklaması zorunludur"),
});

const EditStep = () => {
    const { id: stepId } = useParams();
    const [step, setStep] = React.useState<IStepResponseP | null>(null);
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );

    useEffect(() => {
        if (stepId) {
            setFetchStatus(FetchStatus.LOADING);
            getStep(parseInt(stepId)).then((res) => {
                setStep(res);
                setFetchStatus(FetchStatus.SUCCEEDED);
            });
        }
    }, [stepId]);

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: step?.name || "",
            description: step?.description || "",
        } as IStepResponseP,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            updateStep({ id: parseInt(stepId!), data: values }).then(() => {
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
                    <h4 className="text-lg text-gray-800 font-bold">{step?.name} Adımünü Düzenle</h4>
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
                                placeholder="Örnek: Adres Adımı"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.name}
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

export default EditStep;
