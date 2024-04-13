import { EEntityOrigin } from '@app/modules/variable/core/models/entity-variable.enums'
import { EntityOriginProvider } from '@app/modules/variable/entity/contexts/EntityOriginContext'
import EntityVariableCard from '@app/modules/variable/entity/EntityVariableCard'

const EditBLVariables = () => {

    return (
        <EntityOriginProvider initialOrigin={EEntityOrigin.BUSINESS_LINE}>
            <EntityVariableCard />
        </EntityOriginProvider>
    )
}

export default EditBLVariables