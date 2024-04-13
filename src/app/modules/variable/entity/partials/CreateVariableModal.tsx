import Modal from "@base/components/common/modals/Modal";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
    IEntityVariableCreateRequest,
} from "../../core/models/entity-variable.interface";
import toast from "react-hot-toast";
import { assignEntityVariable, createEntityVariable } from "../../core/api/entity-variable.requests";
import { loadUnitOptions } from "@app/modules/predefinitions/units/core/functions/unit.functions";
import AsyncSelect from "@base/components/common/selects/AsyncSelect";
import CustomSelect from "@base/components/common/selects/CustomSelect";
import { loadVariableOptions, RSvariableTypeOptions } from "../../core/functions/variable.functions";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@base/components/common/buttons/Button";
import { useEntityOrigin } from "../contexts/EntityOriginContext";

type Props = {
    entity_id?: string;
};

// Dinamik validasyon şemasını oluşturan fonksiyon
const createValidationSchema = ({ pool }: {
    pool: {
        value: number | null,
        label: string
    }
}) => {
    //Eğer pool.value null ise, name, type ve unit için validasyon kurallarını uygula
    if (pool && pool.value === null) {
        return Yup.object().shape({
            name: Yup.string().required("Değişken adı zorunludur"),
            type: Yup.object().shape({
                value: Yup.string().required("Değişken tipi seçiniz"),
            }),
            unit: Yup.object().shape({
                value: Yup.number().required("Birim seçiniz"),
            }),
        });

    }
    //Aksi takdirde, name, type ve unit için validasyon yapma
    return Yup.object().shape({});


};

const CreateVariableModal: React.FC<Props> = ({
    entity_id,
}) => {
    const { origin, refetchEntityVariables } = useEntityOrigin();
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            pool: {
                value: null,
                label: "Yeni Değişken Ekle",
            },
            name: "",
            active: false,
            options: [
                {
                    name: "",
                },
            ],
            type: {
                value: null,
                label: "Değişken Tipi Seçiniz",
            },
            unit: {
                value: null,
                label: "Birim Seçiniz",
            },
        },
        validationSchema: () => createValidationSchema(formik.values),
        onSubmit: (values) => {
            if (values.pool.value === null) {
                let reqBody = {
                    entity_id: parseInt(entity_id!),
                    active: values.active,
                    name: values.name,
                    options: values.options,
                    type: values.type.value,
                    unit_id: values.unit.value,
                } as IEntityVariableCreateRequest;
                createEntityVariable({ origin: origin, data: reqBody }).then(() => {
                    toast.success("Değişken başarıyla eklendi");
                    refetchEntityVariables();
                    setOpen(false);
                });
            }
            else {
                assignEntityVariable({
                    origin: origin, data: {
                        entity_id: parseInt(entity_id!),
                        variable_id: values.pool.value
                    }
                }).then(() => {
                    toast.success("Değişken başarıyla eklendi");
                    refetchEntityVariables();
                    setOpen(false);
                });
            }
        },
    });

    return (
        <React.Fragment>
            <button
                onClick={() => {
                    setOpen(true);
                }}
                type="button"
                className="text-red-500 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Değişken Ekle
            </button>
            <form onSubmit={formik.handleSubmit}>
                <Modal
                    size="lg"
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        formik.resetForm();
                    }}
                >
                    <Modal.Header>
                        {" "}
                        <h4 className="text-lg text-gray-800 font-bold">Değişken Ekle</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="max-w-2xl mx-auto">

                            <div className="mb-3">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-normal text-gray-600 "
                                >
                                    Yeni Değişken Ekle / Değişen Havuzundan Seç
                                </label>
                                <AsyncSelect
                                    isSearchable
                                    loadOptions={loadVariableOptions}
                                    value={formik.values.pool}
                                    onChange={(value) => {
                                        formik.setFieldValue("pool", value);
                                    }}
                                    placeholder="Yeni Değişken Ekle"
                                />
                            </div>
                            {
                                formik.values.pool.value === null && (
                                    <React.Fragment>
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
                                                Seçenekler ({formik.values.options.length})
                                            </label>
                                            {formik.values.options.map((option, index) => (
                                                <div className="relative mb-3" key={index}>
                                                    <span className="absolute left-1 top-1 bg-gray-50 opacity-75 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-2 py-1">
                                                        <kbd>
                                                            {formik.values.unit.value ? (
                                                                formik.values.unit.label
                                                            ) : (
                                                                <Icon
                                                                    icon="ic:round-warning"
                                                                    className="text-red-500  text-xs w-5 h-5"
                                                                />
                                                            )}
                                                        </kbd>
                                                    </span>

                                                    <input
                                                        name={`options[${index}].name`}
                                                        className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-red-100 focus:border-red-100 ps-12"
                                                        placeholder="Örnek: 1"
                                                        value={option.name}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            formik.setFieldValue(
                                                                "options",
                                                                formik.values.options.filter(
                                                                    (_, i) => i !== index
                                                                )
                                                            );
                                                        }}
                                                        type="button"
                                                        className="text-white absolute right-1 top-1 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                                                    >
                                                        <div className="flex items-center gap-1">
                                                            <Icon icon="ic:baseline-delete" />
                                                            <span>Sil</span>
                                                        </div>
                                                    </button>
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                color="red"
                                                icon={<Icon icon="ic:baseline-plus" />}
                                                onClick={() => {
                                                    formik.setFieldValue("options", [
                                                        ...formik.values.options,
                                                        { name: "" },
                                                    ]);
                                                }}
                                            />
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
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
                                onClick={() => setOpen(false)}
                            >
                                Iptal
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </form>
        </React.Fragment>
    );
};

export default CreateVariableModal;
