import React from "react";
import { IVariableOption } from "../../core/models/variable.interface";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
    deleteVariableOption,
    updateVariableOption,
} from "../../core/api/variable.requests";
import toast from "react-hot-toast";
import clsx from "clsx";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Button from "@base/components/common/buttons/Button";
import { debounce } from "lodash";

type Prop = {
    option: IVariableOption;
    unit: {
        value: number | null;
        label: string;
    };
    successCallback: () => void;
};

const VariableOptionIpnut: React.FC<Prop> = ({
    option,
    unit,
    successCallback,
}) => {
    const [optionName, setOptionName] = React.useState(option.name);
    const debounceFn = React.useCallback(debounce(handleDebounce, 500), []);

    function handleDebounce(inputValue: string) {
        updateVariableOption({
            option_id: option.id,
            data: {
                name: inputValue,
            },
        })
    }

    function handleDeleteOptionFromVariable(option_id: number) {
        deleteVariableOption(option_id).then(() => {
            toast.success("Seçenek başarıyla silindi");
            successCallback();
        });
    }

    function handleAnswerChange() {
        updateVariableOption({
            option_id: option.id,
            data: {
                is_answer: !option.is_answer,
            },
        }).then(() => {
            toast.success("Seçenek başarıyla güncellendi");
            successCallback();
        });
    }

    return (
        //
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
                    <OverlayTrigger
                        trigger="click"
                        placement="auto"
                        rootClose
                        overlay={
                            <Popover id="popover-positioned-left" title="Cevap Durumu">
                                <div
                                    role="tooltip"
                                    className="inline-block w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm "
                                >
                                    <div className="flex justify-between items-center px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg ">
                                        <h3 className="font-semibold text-gray-900 ">
                                            {option.is_answer
                                                ? "Cevap Durumundan Çıkar"
                                                : "Cevap olarak işaretle"}
                                        </h3>
                                    </div>
                                    <div className="px-3 py-2">
                                        <Button
                                            onClick={handleAnswerChange}
                                            color={option.is_answer ? "red" : "green"}
                                            size="sm"
                                        >
                                            {option.is_answer
                                                ? "Cevap Durumundan Çıkar"
                                                : "Cevap olarak işaretle"}
                                        </Button>
                                    </div>
                                </div>
                            </Popover>
                        }
                    >
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
                    </OverlayTrigger>
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

export default VariableOptionIpnut;
