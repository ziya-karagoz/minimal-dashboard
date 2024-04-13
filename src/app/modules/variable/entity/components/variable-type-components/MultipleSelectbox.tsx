import React from "react";
import { useEntityOrigin } from "../../contexts/EntityOriginContext";
import CustomSelect from "@base/components/common/selects/CustomSelect";
import { IVariableResponse } from "@app/modules/variable/core/models/variable.interface";
import UpdateVariableModal from "../../partials/UpdateVariableModal";
import {
    updateEntityVariable,
    updateOptionToEntityVariable,
} from "@app/modules/variable/core/api/entity-variable.requests";
import toast from "react-hot-toast";

type Props = {
    variable: IVariableResponse;
};

const MultipleSelectbox: React.FC<Props> = ({ variable }) => {
    const { origin, refetchEntityVariables } = useEntityOrigin();

    const answers = variable.options.filter((option) => option.is_answer);
    const defaultOptions = answers
        ? answers.map((answer) => ({ label: answer.name, value: answer.id }))
        : null;

    function handleActiveChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateEntityVariable({
            origin,
            variable_id: variable.id,
            data: {
                active: e.target.checked,
            },
        }).then(() => {
            toast.success("Değişken aktifliği güncellendi");
            refetchEntityVariables();
        });
    }

    function handleMultiSelectChange(selectedOptions: { label: string; value: string }[]) {
        console.log({
            variable: variable.options,
            selecteD: selectedOptions
        });
        variable.options.forEach((option) => {
            const optionExist = selectedOptions.find((selectedOption) => selectedOption.value.toString() === option.id.toString());
            if (optionExist) {
                if (!option.is_answer) {
                    updateOptionToEntityVariable({
                        origin,
                        option_id: option.id,
                        data: {
                            is_answer: true,
                        },
                    }).then(() => {
                        toast.success("Seçenek cevap olarak işaretlendi");
                        refetchEntityVariables();
                    });
                }
            } else {
                if (option.is_answer) {
                    updateOptionToEntityVariable({
                        origin,
                        option_id: option.id,
                        data: {
                            is_answer: false,
                        },
                    }).then(() => {
                        toast.success("Seçenek cevap olarak işaretlendi");
                        refetchEntityVariables();
                    });
                }
            }
        }
        );

    }

    return (
        <div className="my-12">
            <div className="w-full">
                <div className="flex items-center justify-start gap-2 mb-1">
                    <label className="block mb-2 text-base font-normal text-gray-600 ">
                        {variable.name}
                        <kbd className="ml-2 text-xs bg-gray-100 px-1 py-0.5 text-gray-400">
                            {variable.unit.name}
                        </kbd>
                    </label>
                    <UpdateVariableModal variable={variable} />
                </div>
                <div className="gap-2 w-full flex justify-between items-center">
                    <div className="w-full">
                        <CustomSelect
                            inactive={!variable.active}
                            placeholder="Seçiniz..."
                            isMulti
                            options={variable.options.map((option) => ({
                                label: option.name,
                                value: option.id,
                            }))}
                            value={defaultOptions}
                            onChange={handleMultiSelectChange}
                        />
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

export default MultipleSelectbox;
