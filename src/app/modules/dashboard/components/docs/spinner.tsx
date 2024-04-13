import Spinner from "@base/components/common/spinner/Spinner";


const CSpinner = () => {
    return (
        <>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Sizes and Colors</h5>
                <div className="flex space-x-4">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                    <Spinner size="xl" />
                </div>
                <div className="flex space-x-4">
                    <Spinner size="sm" color="blue" />
                    <Spinner size="md" color="blue" />
                    <Spinner size="lg" color="blue" />
                    <Spinner size="xl" color="blue" />
                </div>
                <div className="flex space-x-4">
                    <Spinner size="sm" color="red" />
                    <Spinner size="md" color="red" />
                    <Spinner size="lg" color="red" />
                    <Spinner size="xl" color="red" />
                </div>
                <div className="flex space-x-4">
                    <Spinner size="sm" color="green" />
                    <Spinner size="md" color="green" />
                    <Spinner size="lg" color="green" />
                    <Spinner size="xl" color="green" />
                </div>
                <div className="flex space-x-4">
                    <Spinner size="sm" color="indigo" />
                    <Spinner size="md" color="indigo" />
                    <Spinner size="lg" color="indigo" />
                    <Spinner size="xl" color="indigo" />
                </div>
                <div className="flex space-x-4">
                    <Spinner size="sm" color="orange" />
                    <Spinner size="md" color="orange" />
                    <Spinner size="lg" color="orange" />
                    <Spinner size="xl" color="orange" />
                </div>
                <div className="flex space-x-4">
                    <Spinner size="sm" color="pink" />
                    <Spinner size="md" color="pink" />
                    <Spinner size="lg" color="pink" />
                    <Spinner size="xl" color="pink" />
                </div>
                <div className="flex space-x-4">
                    <Spinner size="sm" color="purple" />
                    <Spinner size="md" color="purple" />
                    <Spinner size="lg" color="purple" />
                    <Spinner size="xl" color="purple" />
                </div>
                <div className="flex space-x-4">
                    <Spinner size="sm" color="yellow" />
                    <Spinner size="md" color="yellow" />
                    <Spinner size="lg" color="yellow" />
                    <Spinner size="xl" color="yellow" />
                </div>
            </div>
        </>
    );
};

export default CSpinner;
