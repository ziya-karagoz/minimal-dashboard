import { EEntityOrigin } from '@app/modules/variable/core/models/entity-variable.enums'
import { EntityOriginProvider } from '@app/modules/variable/entity/contexts/EntityOriginContext'
import EntityVariableCard from '@app/modules/variable/entity/EntityVariableCard'

const EditSVariables = () => {

    return (
        <EntityOriginProvider initialOrigin={EEntityOrigin.SERVICE}>
            <EntityVariableCard />
        </EntityOriginProvider>
    )
}

export default EditSVariables