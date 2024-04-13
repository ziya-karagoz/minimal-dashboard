import React from 'react';
import Indicator from "@base/components/common/indicators/Indicator";
import clsx from 'clsx';


type AvatarProps = {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | "2xl";
    shape?: 'rounded' | 'circle';
    src?: string;
    initial?: string;
    alt?: string;
    className?: string;
    bordered?: boolean;
    children?: React.ReactNode;
    type?: 'default' | 'stacked';
    indicator?: {
        color?: 'blue' | 'gray' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'orange';
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    };
};

const Avatar: React.FC<AvatarProps> = ({
    size = 'md',
    shape = 'circle',
    src,
    initial,
    alt,
    className,
    bordered,
    children,
    type = 'default',
    indicator,
}) => {
    const sizeClasses = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-20 h-20',
        xl: 'w-36 h-36',
        '2xl': 'w-48 h-48',
    };

    const shapeClasses = {
        rounded: 'rounded-lg',
        circle: 'rounded-full',
    };

    const borderClass = bordered ? `ring-2 p-1 ring-gray-300 ${indicator ? clsx({
        "ring-blue-300": indicator.color === 'blue',
        "ring-gray-300": indicator.color === 'gray',
        "ring-red-300": indicator.color === 'red',
        "ring-green-300": indicator.color === 'green',
        "ring-yellow-300": indicator.color === 'yellow',
        "ring-indigo-300": indicator.color === 'indigo',
        "ring-purple-300": indicator.color === 'purple',
        "ring-pink-300": indicator.color === 'pink',
        "ring-orange-300": indicator.color === 'orange',

    }) : ''
        }` : '';

    const avatarClass = `${sizeClasses[size]} ${shapeClasses[shape]} ${borderClass} ${className || ''}`;

    const renderIndicator = () => {
        if (type === 'default' && indicator && indicator.color) {
            return <Indicator color={indicator.color} />;
        }
        return null;
    };

    return (
        <div className="relative inline-block">
            {src ? (
                <img className={avatarClass} src={src} alt={alt || 'Avatar'} />
            ) : (
                <div
                    className={`${avatarClass} flex items-center justify-center bg-gray-100 dark:bg-gray-600`}
                >
                    <span className="font-medium text-gray-600 dark:text-gray-300">{initial}</span>
                </div>
            )}
            <div className={
                clsx("absolute", {
                    'top-0 left-0': indicator?.position === 'top-left',
                    'top-0 right-0': indicator?.position === 'top-right',
                    'bottom-0 left-0': indicator?.position === 'bottom-left',
                    'bottom-0 right-0': indicator?.position === 'bottom-right',
                })
            }
            >
                {renderIndicator()}
            </div>
            {children}
        </div>
    );
};

export default Avatar;
