
import Card from "@base/components/common/cards/Card";
import { useParams } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "react-tooltip";
import CreateVariableModal from "./partials/CreateVariableModal";
import Accordion from "@base/components/common/accordions/Accordion";
import { EEntityItemTypeL } from "../core/models/entity-variable.enums";
import RelativeVariable from "./components/variable-type-components/RelativeVariable";
import { useEntityOrigin } from "./contexts/EntityOriginContext";

type Props = {
};

const EntityVariableCard: React.FC<Props> = () => {
    const { id: entity_id } = useParams();
    const { entityVariableResponse } = useEntityOrigin();



    return (
        <Card>
            <Card.Header>
                <div className="w-full flex justify-between items-center ">
                    <h4 className="text-lg text-gray-800 font-bold">
                        {entityVariableResponse?.entity.name} Değişkenleri
                    </h4>
                    <div className="flex gap-2">
                        <CreateVariableModal entity_id={entity_id}
                        />
                        <Tooltip
                            id="filter-variable-tooltip"
                            place="top"
                            content="Filtre"
                        />
                        <button
                            data-tooltip-id="filter-variable-tooltip"
                            type="button"
                            className="text-red-500 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto p-4 text-center"
                        >
                            <Icon icon="ion:filter" />
                        </button>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Accordion style="flush" alwaysOpen>
                    {
                        entityVariableResponse?.items.map((item, i) => (
                            <Accordion.Item key={i} eventKey={item.type}>
                                <Accordion.Header eventKey={item.type}>{EEntityItemTypeL[item.type]} Değişkenleri</Accordion.Header>
                                <Accordion.Body eventKey={item.type}>
                                    <section className="mx-auto max-w-3xl">
                                        {
                                            item.variables.map((variable, j) => (
                                                <RelativeVariable key={j} variable={variable} />
                                            ))
                                        }
                                    </section>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))
                    }

                </Accordion>
            </Card.Body>
        </Card>
    );
};

export default EntityVariableCard;
