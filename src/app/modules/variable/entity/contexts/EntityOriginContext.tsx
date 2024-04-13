import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EEntityOrigin } from '../../core/models/entity-variable.enums';
import { useParams } from 'react-router';
import { IEntityVariableListResponse } from '../../core/models/entity-variable.interface';
import { FetchStatus } from '@base/enums/api.enum';
import { fetchEntityVariables } from '../../core/api/entity-variable.requests';
import Loader from '@base/layout/components/loader/Loader';

type EntityOriginContextType = {
    origin: EEntityOrigin;
    setOrigin: (origin: EEntityOrigin) => void;
    entityVariableResponse?: IEntityVariableListResponse;
    refetchEntityVariables: () => void;
};

const EntityOriginContext = createContext<EntityOriginContextType | undefined>(undefined);

export const EntityOriginProvider: React.FC<{ children: ReactNode; initialOrigin: EEntityOrigin }> = ({ children, initialOrigin }) => {
    const { id: entity_id } = useParams();
    const [origin, setOrigin] = useState<EEntityOrigin>(initialOrigin);
    const [entityVariableResponse, setEntityVariableResponse] = React.useState<
        IEntityVariableListResponse | undefined
    >();
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );
    React.useEffect(() => {
        setFetchStatus(FetchStatus.LOADING);
        refetchEntityVariables();
    }, [origin, entity_id]);

    function refetchEntityVariables() {
        if (!entity_id) return;
        fetchEntityVariables({ origin, entity_id: parseInt(entity_id) })
            .then((response) => {
                setEntityVariableResponse(response);
                setFetchStatus(FetchStatus.SUCCEEDED);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }

    if (fetchStatus === FetchStatus.LOADING) return <Loader isComponent />

    return (
        <EntityOriginContext.Provider value={{ origin, setOrigin, entityVariableResponse, refetchEntityVariables }}>
            {children}
        </EntityOriginContext.Provider>
    );
};

export const useEntityOrigin = (): EntityOriginContextType => {
    const context = useContext(EntityOriginContext);
    if (context === undefined) {
        throw new Error('useEntityOrigin must be used within an EntityOriginProvider');
    }
    return context;
};
