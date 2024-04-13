
export type AccordionProps = {
    defaultActiveKey?: string | string[];
    multiExpandable?: boolean;
    alwaysOpen?: boolean;
    style: "default" | "flush";
    children: React.ReactNode;
};


export type AccordionItemProps = {
    eventKey: string;
    children: React.ReactNode;
};

export type AccordionHeaderProps = {
    children: React.ReactNode;
};

export type AccordionBodyProps = {
    children: React.ReactNode;
};