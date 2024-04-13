import clsx from "clsx";
import React, { useContext, useState, useRef, useEffect } from "react";
import { AccordionBodyProps, AccordionHeaderProps, AccordionItemProps, AccordionProps } from "./Accordion.types";


const AccordionContext = React.createContext<{
    activeKeys: string[];
    setActiveKey: (key: string) => void;
    currentEventKey?: string;
} | undefined>(undefined);

const Accordion: React.FC<AccordionProps> & {
    Item: React.FC<AccordionItemProps>;
    Header: React.FC<AccordionHeaderProps>;
    Body: React.FC<AccordionBodyProps>;
} = ({ defaultActiveKey, multiExpandable = false, alwaysOpen = false, style, children }) => {
    const initialActiveKeys = alwaysOpen ? React.Children.map(children, (child: any) => child.props.eventKey) : Array.isArray(defaultActiveKey) ? defaultActiveKey : [defaultActiveKey || ''];
    const [activeKeys, setActiveKeys] = useState(initialActiveKeys);
    const setActiveKey = (key: string) => {
        if (alwaysOpen || multiExpandable) {
            if (activeKeys.includes(key)) {
                setActiveKeys(activeKeys.filter((k: any) => k !== key));
            } else {
                setActiveKeys([...activeKeys, key]);
            }
        } else {
            setActiveKeys(activeKeys.includes(key) ? [] : [key]);
        }
    };
    const value = { activeKeys, setActiveKey };

    return (
        <AccordionContext.Provider value={value}>
            <div
                className={clsx("border-gray-200 mb-2 first:rounded-t-lg last:rounded-b-lg", {
                    border: style === "default",
                })}
            >
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

const AccordionItem: React.FC<AccordionItemProps> = ({ eventKey, children }) => {
    const { activeKeys, setActiveKey } = useContext(AccordionContext)!;
    return (
        <AccordionContext.Provider value={{ activeKeys, setActiveKey, currentEventKey: eventKey }}>
            <div>{children}</div>
        </AccordionContext.Provider>
    );
};

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ children }) => {
    const { activeKeys, setActiveKey, currentEventKey } = useContext(AccordionContext)!;
    const isActive = activeKeys.includes(currentEventKey!);

    const handleClick = () => {
        setActiveKey(currentEventKey!);
    };

    return (
        <button
            type="button"
            className={clsx("flex items-center justify-between w-full px-2 py-5 font-medium rounded-t-xl border-b gap-3", {
                "bg-white text-gray-900": isActive,
                "text-gray-500": !isActive,
            })}
            onClick={handleClick}
        >
            <span>{children}</span>
            <svg
                className={`w-3 h-3 ${isActive ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                />
            </svg>
        </button>
    );
};

const AccordionBody: React.FC<AccordionBodyProps> = ({ children }) => {
    const { activeKeys, currentEventKey } = useContext(AccordionContext)!;
    const isActive = activeKeys.includes(currentEventKey!);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(isActive ? 'auto' : '0');

    useEffect(() => {
        if (isActive) {
            setHeight(`${contentRef.current?.scrollHeight}px`);
        } else {
            setHeight('0');
        }
    }, [isActive]);

    return (
        <div
            ref={contentRef}
            className="overflow-hidden px-2 transition-all duration-300"
            style={{ height }}
        >
            <div className="py-5 border-b border-gray-200">
                {children}
            </div>
        </div>
    );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
