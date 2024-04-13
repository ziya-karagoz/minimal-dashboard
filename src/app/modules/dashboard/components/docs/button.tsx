import Button from "@base/components/common/buttons/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

const CButton = () => {
    return (
        <>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Colors</h5>
                <Button color="blue" size="xs">
                    Very Small
                </Button>
                <Button color="gray" size="sm" >
                    Small
                </Button>
                <Button color="red" size="base">
                    Medium
                </Button>
                <Button color="green" size="lg" >
                    Large
                </Button>
                <Button color="yellow" size="xl">
                    Very Large
                </Button>

            </div >
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Colors</h5>
                <div className="flex flex-wrap gap-4">
                    <Button color="blue" size="base" loader>
                        Blue
                    </Button>
                    <Button color="gray" size="base" >
                        Gray
                    </Button>
                    <Button color="red" size="base" loader>
                        Red
                    </Button>
                    <Button color="green" size="base" >
                        Green
                    </Button>
                    <Button color="yellow" size="base" loader>
                        Yellow
                    </Button>
                    <Button color="indigo" size="base" >
                        Indigo
                    </Button>
                    <Button color="purple" size="base" disabled>
                        Purple
                    </Button>
                    <Button color="pink" size="base" >
                        Pink
                    </Button>
                    <Button color="orange" size="base" >
                        Orange
                    </Button>

                </div>
            </div >
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Outlined</h5>
                <div className="flex flex-wrap gap-4">
                    <Button color="blue" size="base" outlined>
                        Click me
                    </Button>
                    <Button color="gray" size="base" outlined disabled>
                        Click me
                    </Button>
                    <Button color="red" size="base" outlined icon={<Icon icon="bx:bx-home" />} >
                        Click me
                    </Button>
                    <Button color="green" size="base" outlined loader disabled>
                        Click me
                    </Button>
                    <Button color="yellow" size="base" outlined>
                        Click me
                    </Button>
                    <Button color="indigo" size="base" outlined>
                        Click me
                    </Button>
                    <Button color="purple" size="base" outlined loader>
                        Click me
                    </Button>
                    <Button color="pink" size="base" outlined>
                        Click me
                    </Button>
                    <Button color="orange" size="base" outlined>
                        Click me
                    </Button>

                </div>
            </div >
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Gradient</h5>
                <div>
                    <Button color="blue" size="base" gradient>
                        Click me
                    </Button>
                    <Button color="gray" size="base" gradient icon={<Icon icon="bx:bx-home" />}>
                        Click me
                    </Button>
                    <Button color="red" size="base" gradient disabled>
                        Click me
                    </Button>
                    <Button color="green" size="base" gradient icon={<Icon icon="bx:bx-home" />} loader disabled>
                        Click me
                    </Button>
                    <Button color="yellow" size="base" gradient>
                        Click me
                    </Button>
                    <Button color="indigo" size="base" gradient>
                        Click me
                    </Button>
                    <Button color="purple" size="base" gradient>
                        Click me
                    </Button>
                    <Button color="pink" size="base" gradient>
                        Click me
                    </Button>
                    <Button color="orange" size="base" gradient>
                        Click me
                    </Button>
                </div>
            </div >
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Gradient and Outlined</h5>
                <div>
                    <Button color="blue" size="base" outlined gradient>
                        Click me
                    </Button>
                    <Button color="gray" size="base" outlined gradient>
                        Click me
                    </Button>
                    <Button color="red" size="base" outlined gradient>
                        Click me
                    </Button>
                    <Button color="green" size="base" outlined gradient>
                        Click me
                    </Button>
                    <Button color="yellow" size="base" outlined gradient>
                        Click me
                    </Button>
                    <Button color="indigo" size="base" outlined gradient>
                        Click me
                    </Button>
                    <Button color="purple" size="base" outlined gradient>
                        Click me
                    </Button>
                    <Button color="pink" size="base" outlined gradient>
                        Click me
                    </Button>
                    <Button color="orange" size="base" outlined gradient>
                        Click me
                    </Button>
                </div>
            </div >

        </>
    );
};

export default CButton;
