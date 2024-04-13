import Card from "@base/components/common/cards/Card";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router";
import {
    createVariableOption,
    fetchVariable,
    updateVariable,
} from "../core/api/variable.requests";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
    IVariableResponse,
    IVariableUpdateRequest,
} from "../core/models/variable.interface";
import AsyncSelect from "@base/components/common/selects/AsyncSelect";
import { loadUnitOptions } from "@app/modules/predefinitions/units/core/functions/unit.functions";
import CustomSelect from "@base/components/common/selects/CustomSelect";
import { RSvariableTypeOptions } from "../core/functions/variable.functions";
import Button from "@base/components/common/buttons/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import { EVariableTypeL } from "../core/models/variable.enums";
import VariableOptionIpnut from "./partials/VariableOptionIpnut";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Değişken adı zorunludur"),
    type: Yup.object().shape({
        value: Yup.string().required("Değişken tipi seçiniz"),
    }),
    unit: Yup.object().shape({
        value: Yup.number().required("Birim seçiniz"),
    }),
});

const EditVariable = () => {
    const { id: variable_id } = useParams();
    const [variable, setVariable] = React.useState<
        IVariableResponse | undefined
    >();
    const [variableFetchStatus, setVariableFetchStatus] =
        React.useState<FetchStatus>(FetchStatus.IDLE);
    React.useEffect(() => {
        getVariable();
    }, [variable_id]);

    function getVariable() {
        if (variable_id) {
            setVariableFetchStatus(FetchStatus.LOADING);
            fetchVariable(parseInt(variable_id))
                .then((res) => {
                    setVariable(res);
                    setVariableFetchStatus(FetchStatus.SUCCEEDED);
                })
                .catch(() => setVariableFetchStatus(FetchStatus.FAILED));
        }
    }

    function handleAddOptionToVariable() {
        createVariableOption({
            name: "Yeni Seçenek",
            variable_id: parseInt(variable_id!),
        }).then(() => {
            toast.success("Seçenek başarıyla eklendi");
            getVariable();
        });
    }



    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: variable?.name,
            active: variable?.active,

            type: {
                value: variable?.type ?? null,
                label:
                    EVariableTypeL[variable?.type as keyof typeof EVariableTypeL] ??
                    "Değişken Tipi Seçiniz",
            },
            unit: {
                value: variable?.unit.id ?? null,
                label: variable?.unit.name ?? "Birim Seçiniz",
            },
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let reqBody = {
                name: values.name,
                active: values.active,
                type: values.type.value,
                unit_id: values.unit.value,
            } as IVariableUpdateRequest;
            updateVariable({ id: parseInt(variable_id!), data: reqBody }).then(() => {
                toast.success("Değişken başarıyla güncellendi");
                navigate(-1);
            });
        },
    });

    if (variableFetchStatus !== FetchStatus.SUCCEEDED)
        return <Loader isComponent />;

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <Card.Header>
                    <h4 className="text-lg text-gray-800 font-bold">Değişken Düzenle</h4>
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
                                placeholder="Örnek: Asansör sayısı nedir?"
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
                                htmlFor="phone"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Birimi
                            </label>
                            <AsyncSelect
                                loadOptions={loadUnitOptions}
                                value={formik.values.unit}
                                onChange={(value) => {
                                    formik.setFieldValue("unit", value);
                                }}
                                placeholder="Birim Seçiniz"
                            />

                            {formik.touched.unit?.value && formik.errors.unit?.value ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.unit?.value}
                                </p>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Değişken Tipi
                            </label>
                            <CustomSelect
                                value={formik.values.type}
                                options={RSvariableTypeOptions}
                                onChange={(value) => {
                                    console.log(value);
                                    formik.setFieldValue("type", value);
                                }}
                                placeholder="Birim Seçiniz"
                            />

                            {formik.touched.type?.value && formik.errors.type?.value ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.type.value}
                                </p>
                            ) : null}
                        </div>
                        {/* active */}
                        <div className="mb-3">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={formik.values.active}
                                    onChange={formik.handleChange}
                                    id="active"
                                    name="active"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    Aktiflik Durumu
                                </span>
                            </label>
                        </div>
                        <div className="my-6">
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Seçenekler ({variable?.options.length})
                            </label>
                            {variable?.options.map((option, index) => (
                                <VariableOptionIpnut option={option} key={index} unit={formik.values.unit} successCallback={getVariable} />
                            ))}
                            <Button
                                type="button"
                                color="red"
                                icon={<Icon icon="ic:baseline-plus" />}
                                onClick={handleAddOptionToVariable}
                            />
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
                            onClick={() => navigate(-1)}
                        >
                            Iptal
                        </button>
                    </div>
                </Card.Footer>
            </Card>
        </form>
    );
};

export default EditVariable;
