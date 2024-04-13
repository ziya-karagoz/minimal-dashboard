import { EVariableType } from "@app/modules/variable/core/models/variable.enums";
import React from "react";
import Checkbox from "./Checkbox";
import MultipleCheckbox from "./MultipleCheckbox";
import Selectbox from "./Selectbox";
import MultipleSelectbox from "./MultipleSelectbox";
import { IVariableResponse } from "@app/modules/variable/core/models/variable.interface";

type Props = {
    variable: IVariableResponse;
};
const RelativeVariable: React.FC<Props> = ({ variable }) => {
    switch (variable.type) {
        case EVariableType.SELECTBOX:
            return <Selectbox variable={variable} />;
        case EVariableType.CHECKBOX:
            return <Checkbox variable={variable} />;
        case EVariableType.MULTIPLE_CHECKBOX:
            return <MultipleCheckbox variable={variable} />;
        case EVariableType.MULTIPLE_SELECTBOX:
            return <MultipleSelectbox variable={variable} />;
    }
};

export default RelativeVariable;
