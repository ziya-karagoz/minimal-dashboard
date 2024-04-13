import Progress from "@base/components/common/progresses/Progress";
import React from "react";

const CProgress = () => {

    const [value, setValue] = React.useState(0);


    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((prev) => (prev >= 100 ? 0 : prev + 1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Variants</h5>
                <div className="space-y-4">
                    <Progress
                        title="Blue"
                        value={23}
                        color="blue"
                        size="sm"
                        withLabel={true}
                        labelPosition="outside"
                    />
                    <Progress
                        title="Gray"
                        value={16}
                        color="gray"
                        size="md"
                        withLabel={true}
                        labelPosition="inside"
                    />
                    <Progress
                        title="Indigo"
                        value={45}
                        color="indigo"
                        size="lg"
                        withLabel={true}
                        labelPosition="inside"
                    />
                    <Progress
                        title="Orange"
                        value={100}
                        color="orange"
                        size="sm"
                        withLabel={true}
                        labelPosition="outside"
                    />
                    <Progress
                        title="Green"
                        value={95}
                        color="green"
                        size="md"
                        withLabel={true}
                        labelPosition="inside"
                    />
                    <Progress
                        title="Pink"
                        value={59}
                        color="pink"
                        size="lg"
                        withLabel={true}
                        labelPosition="inside"
                    />
                    <Progress
                        title="Purple"
                        value={75}
                        color="purple"
                        size="sm"
                        withLabel={true}
                        labelPosition="inside"
                    />
                    <Progress
                        title="Red"
                        value={12}
                        color="red"
                        size="md"
                        withLabel={true}
                        labelPosition="inside"
                    />
                    <Progress
                        title="Yellow"
                        value={22}
                        color="yellow"
                        size="lg"
                        withLabel={true}
                        labelPosition="outside"
                    />
                    <Progress
                        title="Progressive"
                        value={value}
                        progressiveColors
                        size="md"
                        withLabel={true}
                        labelPosition="inside"
                    />


                </div>
            </div>
        </>
    );
};

export default CProgress;
