import React, { createContext, useContext, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { useIntersectionObserver } from "@uidotdev/usehooks";

type CardProps = {
    exClass?: string;
    shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
    dismissible?: boolean;
    collapsible?: boolean;
    onDismiss?: () => void;
    children: React.ReactNode;
};

type CardHeaderProps = {
    dismissIcon?: React.ReactNode;
    children: React.ReactNode;
};

type CardBodyProps = {
    children: React.ReactNode;
};

type CardFooterProps = {
    floating?: boolean; // Yeni özellik
    children: React.ReactNode;
};

const CardContext = createContext<{
    dismissible?: boolean;
    collapsible?: boolean;
    collapsed?: boolean;
    onDismiss?: () => void;
    toggleCollapse?: () => void;
}>({});

const CardHeader: React.FC<CardHeaderProps> = ({ children, dismissIcon }) => {
    const { dismissible, onDismiss, collapsible, collapsed, toggleCollapse } = useContext(CardContext);

    return (
        <div className={clsx("p-4 border-gray-200", { "border-b": !collapsed })}>
            <div className="flex justify-between items-center">
                <div className="w-full">{children}</div>
                <div className="flex items-center">
                    {collapsible && (
                        <span
                            className="text-gray-400 hover:text-gray-500 cursor-pointer mr-2"
                            onClick={toggleCollapse}
                        >
                            <Icon icon="bi:chevron-down" className={clsx({ "transform rotate-180 duration-300": collapsed })} />
                        </span>
                    )}
                    {dismissible && (
                        <span
                            className="text-gray-400 hover:text-gray-500 cursor-pointer"
                            onClick={onDismiss}
                        >
                            {dismissIcon ? (
                                dismissIcon
                            ) : (
                                <Icon icon="bi:x" />
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const CardBody: React.FC<CardBodyProps> = ({ children }) => {
    const { collapsible, collapsed } = useContext(CardContext);

    if (collapsible && collapsed) {
        return null;
    }

    return <div className="p-4">{children}</div>;
};

const CardFooter: React.FC<CardFooterProps> = ({ children, floating }) => {
    const [ref, entry] = useIntersectionObserver({
        threshold: 1,
        root: null,
        rootMargin: "0px",
    });

    // Footer görüş alanında değilse ve floating true ise, aşağıda mutlak konumda bir footer göster
    const showFloatingFooter = floating && !entry?.isIntersecting;

    return (
        <>
            <div ref={ref} className={clsx("p-4", { "border-t border-gray-200": children })}>
                {children}
            </div>
            {showFloatingFooter && (
                <div className="fixed bottom-0 left-0 right-0  p-4 bg-white shadow">
                    {children}
                </div>
            )}
        </>
    );
};

const Card: React.FC<CardProps> & {
    Header: React.FC<CardHeaderProps>;
    Body: React.FC<CardBodyProps>;
    Footer: React.FC<CardFooterProps>;
} = ({ exClass = "", children, shadow = "md", dismissible, collapsible, onDismiss }) => {
    const [visible, setVisible] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    if (!visible) {
        return null;
    }

    return (
        <CardContext.Provider value={{ dismissible, collapsible, collapsed, onDismiss: handleDismiss, toggleCollapse }}>
            <div
                className={clsx(`bg-white rounded-lg ${exClass}`, {
                    "shadow-sm": shadow === "sm",
                    "shadow-md": shadow === "md",
                    "shadow-lg": shadow === "lg",
                    "shadow-xl": shadow === "xl",
                    "shadow-2xl": shadow === "2xl",
                })}
            >
                {children}
            </div>
        </CardContext.Provider>
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
