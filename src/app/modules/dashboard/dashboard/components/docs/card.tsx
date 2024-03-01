import Card from "@base/components/common/cards/Card";

const Ccard = () => {
    return (
        <>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Default</h5>
                <div className="space-x-2 space-y-2">
                    <Card shadow="lg">
                        <Card.Header >
                            <h3 className="text-lg font-semibold">Card Title</h3>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-gray-600">Card Body</p>
                        </Card.Body>
                        <Card.Footer>
                            <p className="text-gray-600">Card Footer</p>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Dismissable</h5>
                <div className="space-x-2 space-y-2">
                    <Card shadow="lg" dismissible>
                        <Card.Header >
                            <h3 className="text-lg font-semibold">Card Title</h3>
                        </Card.Header>
                        <Card.Body>
                            <p className="text-gray-600">Card Body</p>
                        </Card.Body>
                        <Card.Footer>
                            <p className="text-gray-600">Card Footer</p>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Ccard;
