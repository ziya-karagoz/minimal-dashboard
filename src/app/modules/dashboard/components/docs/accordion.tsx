import Accordion from '@base/components/common/accordions/Accordion'
import Alert from '@base/components/common/alerts/Alert'
import HorizontalTab from '@base/components/common/tabs/HorizontalTab'

const CAccordion = () => {

    return (
        <>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Default</h5>
                <div>
                    <Accordion style="default">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                <Alert dismissible color="blue">This is a blue alert</Alert>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                <HorizontalTab tabs={[
                                    {
                                        title: "Example 1",
                                        content: "This is the content for the Example 1 tab.",
                                    },
                                    {
                                        title: "Example 2",
                                        icon: "ic:round-dashboard",
                                        content: (
                                            <div className="text-primary-500">
                                                We Can insert whatever we want here as you can see.
                                            </div>
                                        ),
                                    },
                                ]} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
            <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Flushed</h5>
                <div>
                    <Accordion style="flush" alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                <Alert dismissible color="blue">This is a blue alert</Alert>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                <HorizontalTab tabs={[
                                    {
                                        title: "Example 1",
                                        content: "This is the content for the Example 1 tab.",
                                    },
                                    {
                                        title: "Example 2",
                                        icon: "ic:round-dashboard",
                                        content: (
                                            <div className="text-primary-500">
                                                We Can insert whatever we want here as you can see.
                                            </div>
                                        ),
                                    },
                                ]} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default CAccordion