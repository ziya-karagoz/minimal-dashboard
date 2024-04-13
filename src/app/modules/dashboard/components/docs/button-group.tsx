import ButtonGroup from "@base/components/common/button-group/ButtonGroup";
import { Icon } from "@iconify/react/dist/iconify.js";

const CButtonGroup = () => {
    const buttons = [
        {
            content: "This is a Link",
            icon: <Icon icon="bx:bx-home" />,
            to: "/dashboard",
        },
        {
            content: "This is Button",
            onClick: () => alert("Search"),
        },
        {
            content: "Favorites",
            icon: <Icon icon="bx:bx-heart" />,
            to: "#",
        },
        {
            content: "Settings",
            icon: <Icon icon="bx:bx-cog" />,
            to: "#",
        },
    ];

    return (
        <>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Defaults</h5>
                <div className="space-x-2 space-y-2">
                    <ButtonGroup buttons={buttons} />
                    <ButtonGroup color="gray" buttons={buttons} />
                    <ButtonGroup color="red" buttons={buttons} />
                    <ButtonGroup color="green" buttons={buttons} />
                    <ButtonGroup color="yellow" buttons={buttons} />
                    <ButtonGroup color="indigo" buttons={buttons} />
                    <ButtonGroup color="purple" buttons={buttons} />
                    <ButtonGroup color="pink" buttons={buttons} />
                    <ButtonGroup color="orange" buttons={buttons} />
                </div>
            </div>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Defaults Outlined</h5>
                <div className="space-x-2 space-y-2">
                    <ButtonGroup outlined buttons={buttons} />
                    <ButtonGroup outlined color="gray" buttons={buttons} />
                    <ButtonGroup outlined color="red" buttons={buttons} />
                    <ButtonGroup outlined color="green" buttons={buttons} />
                    <ButtonGroup outlined color="yellow" buttons={buttons} />
                    <ButtonGroup outlined color="indigo" buttons={buttons} />
                    <ButtonGroup outlined color="purple" buttons={buttons} />
                    <ButtonGroup outlined color="pink" buttons={buttons} />
                    <ButtonGroup outlined color="orange" buttons={buttons} />
                </div>
            </div>
        </>
    );
};

export default CButtonGroup;
