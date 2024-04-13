import React from "react";
import { useEntityOrigin } from "../../contexts/EntityOriginContext";
import { IVariableResponse } from "@app/modules/variable/core/models/variable.interface";
import { updateEntityVariable, updateOptionToEntityVariable } from "@app/modules/variable/core/api/entity-variable.requests";
import clsx from "clsx";
import UpdateVariableModal from "../../partials/UpdateVariableModal";
import toast from "react-hot-toast";

type Props = {
    variable: IVariableResponse;
};

const Checkbox: React.FC<Props> = ({ variable }) => {
    const { origin, refetchEntityVariables } = useEntityOrigin();

    function handleActiveChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateEntityVariable({
            origin,
            variable_id: variable.id,
            data: {
                active: e.target.checked,
            },
        }).then(() => {
            toast.success('Değişken aktifliği güncellendi');
            refetchEntityVariables();
        });
    }

    return (
        <div className="my-12">
            <div className="w-full">
                <div className='flex items-center justify-start gap-2 mb-1'>
                    <label
                        className="block mb-2 text-base font-normal text-gray-600 "
                    >
                        {variable.name}
                        <kbd className="ml-2 text-xs bg-gray-100 px-1 py-0.5 text-gray-400">
                            {variable.unit.name}
                        </kbd></label>
                    <UpdateVariableModal variable={variable} />
                </div>
                <div className="gap-2 w-full flex justify-between items-center">
                    <div className="grid grid-cols-1 gap-2 w-full">
                        {
                            variable.options.map((option, index) => (
                                <div key={index} className="flex items-center ps-4 border border-gray-200 rounded-lg w-full">
                                    <input
                                        id={String(option.id)}
                                        type="radio"
                                        checked={option.is_answer}
                                        name="bordered-radio"
                                        className={clsx("w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500", {
                                            "accent-red-500": variable.active,
                                            "accent-gray-500 opacity-35": !variable.active,
                                        })}
                                        onChange={(e) => {
                                            updateOptionToEntityVariable({
                                                origin,
                                                option_id: option.id,
                                                data: { is_answer: e.target.checked },
                                            }).then(() => {
                                                toast.success('Değişken seçeneği güncellendi');
                                                refetchEntityVariables();
                                            });
                                        }}
                                    />
                                    <label
                                        htmlFor={String(option.id)}
                                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
                                    >
                                        {option.name}
                                    </label>
                                </div>
                            ))
                        }

                    </div>
                    <label className="inline-flex items-center cursor-pointer ">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={variable.active}
                            onChange={handleActiveChange}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Checkbox;
