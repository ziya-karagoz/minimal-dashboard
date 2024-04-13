import Modal from "@base/components/common/modals/Modal";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
    addOptionToEntityVariable,
    deleteOptionFromEntityVariable,
    updateEntityVariable,
    updateOptionToEntityVariable,
} from "../../core/api/entity-variable.requests";
import { loadUnitOptions } from "@app/modules/predefinitions/units/core/functions/unit.functions";
import AsyncSelect from "@base/components/common/selects/AsyncSelect";
import CustomSelect from "@base/components/common/selects/CustomSelect";
import {
    RSvariableTypeOptions,
} from "../../core/functions/variable.functions";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@base/components/common/buttons/Button";
import { useEntityOrigin } from "../contexts/EntityOriginContext";
import { Tooltip } from "react-tooltip";
import {
    IVariableOption,
    IVariableResponse,
    IVariableUpdateRequest,
} from "../../core/models/variable.interface";
import { useParams } from "react-router";
import { EVariableTypeL } from "../../core/models/variable.enums";
import clsx from "clsx";
import { debounce } from "lodash";

type Props = {
    variable: IVariableResponse;
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Değişken adı zorunludur"),
    type: Yup.object().shape({
        value: Yup.string().required("Değişken tipi seçiniz"),
    }),
    unit: Yup.object().shape({
        value: Yup.number().required("Birim seçiniz"),
    }),
});

const UpdateVariableModal: React.FC<Props> = ({ variable }) => {
    const { id: entity_id } = useParams();
    const { origin, refetchEntityVariables } = useEntityOrigin();
    const [open, setOpen] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            name: variable.name,
            active: variable.active,
            options: variable.options,
            type: {
                value: variable.type,
                label: EVariableTypeL[variable.type],
            },
            unit: {
                value: variable.unit.id,
                label: variable.unit.name,
            },
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let reqBody = {
                entity_id: parseInt(entity_id!),
                active: values.active,
                name: values.name,
                type: values.type.value,
                unit_id: values.unit.value,
            } as IVariableUpdateRequest;
            updateEntityVariable({
                origin: origin,
                variable_id: variable.id,
                data: reqBody,
            }).then(() => {
                toast.success("Değişken başarıyla eklendi");
                refetchEntityVariables();
                formik.resetForm();
                setOpen(false);
            });
        },
    });

    function addOption() {
        addOptionToEntityVariable({
            origin: origin,
            data: { name: "Yeni Seçenek", variable_id: variable.id },
        }).then(() => {
            toast.success("Seçenek başarıyla eklendi");
            refetchEntityVariables();
        });
    }

    React.useEffect(() => {
        console.log("Variable:::", formik.values.options);
    }, [formik.values.options]);

    return (
        <React.Fragment>
            <button
                onClick={() => {
                    setOpen(true);
                }}
                data-tooltip-id="edit-variable-tooltio"
                type="button"
                className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-1.5 text-center inline-flex items-center me-1"
            >
                <Tooltip id="edit-variable-tooltio" place="top" content="Düzenle" />
                <Icon icon="bxs:edit" className="w-4 h-4" />
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
                        <h4 className="text-lg text-gray-800 font-bold">Değişken Güncelle</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="max-w-2xl mx-auto">
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
                                        <VariableOptionIpnut key={index} option={option} unit={formik.values.unit} successCallback={refetchEntityVariables} />
                                    ))}
                                    <Button
                                        type="button"
                                        color="red"
                                        icon={<Icon icon="ic:baseline-plus" />}
                                        onClick={addOption}
                                    />
                                </div>
                            </React.Fragment>
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

export default UpdateVariableModal;


type OptionInputProp = {
    option: IVariableOption;
    unit: {
        value: number | null;
        label: string;
    };
    successCallback: () => void;
};

const VariableOptionIpnut: React.FC<OptionInputProp> = ({
    option,
    unit,
    successCallback,
}) => {
    const [optionName, setOptionName] = React.useState(option.name);
    const debounceFn = React.useCallback(debounce(handleDebounce, 500), []);
    const { origin } = useEntityOrigin();
    function handleDebounce(inputValue: string) {
        updateOptionToEntityVariable({
            origin: origin,
            option_id: option.id,
            data: {
                name: inputValue,
            },
        }).then(() => {
            toast.success("Seçenek başarıyla güncellendi");
            successCallback();
        });
    }

    function handleDeleteOptionFromVariable(option_id: number) {
        deleteOptionFromEntityVariable({
            origin: origin,
            option_id: option_id,
        }).then(() => {
            toast.success("Seçenek başarıyla silindi");
            successCallback();
        });
    }

    return (
        <div>
            <div className="mb-3 flex justify-between items-center gap-1">
                <div className="relative w-full">
                    <span className="absolute left-1 top-1 bg-gray-50 opacity-75 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-2 py-1">
                        <kbd>
                            {unit.value ? (
                                unit.label
                            ) : (
                                <Icon
                                    icon="ic:round-warning"
                                    className="text-red-500  text-xs w-5 h-5"
                                />
                            )}
                        </kbd>
                    </span>
                    <input
                        className={clsx(
                            "block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white ps-12",
                            {
                                "outline-red-300 border-red-300 ": !option.is_answer,
                                "outline-green-300 border-green-300 ": option.is_answer,
                            }
                        )}
                        placeholder="Örnek: 1"
                        value={optionName}
                        onChange={(e) => {
                            setOptionName(e.target.value);
                            debounceFn(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => handleDeleteOptionFromVariable(option.id)}
                        type="button"
                        className="text-white absolute right-1 top-1 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1"
                    >
                        <div className="flex items-center gap-1">
                            <Icon icon="ic:baseline-delete" />
                            <span>Sil</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

