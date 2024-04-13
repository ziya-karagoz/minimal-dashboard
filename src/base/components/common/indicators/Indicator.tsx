import clsx from 'clsx';
import { IndicatorProps } from './Indicator.types';



const Indicator = ({ color = "blue", children }: IndicatorProps) => {
    return (
        <span className={`flex items-center text-sm font-medium text-gray-900 me-3`}>
            <span className={clsx("flex w-2.5 h-2.5 rounded-full me-1.5 flex-shrink-0", {
                "text-blue-800 bg-blue-500": color === "blue",
                "text-gray-800 bg-gray-500": color === "gray",
                "text-red-800 bg-red-500": color === "red",
                "text-green-800 bg-green-500": color === "green",
                "text-yellow-800 bg-yellow-500": color === "yellow",
                "text-indigo-800 bg-indigo-500": color === "indigo",
                "text-purple-800 bg-purple-500": color === "purple",
                "text-pink-800 bg-pink-500": color === "pink",
                "text-orange-800 bg-orange-500": color === "orange",
            }
            )}
            ></span>
            {children}
        </span >
    )

}

export default Indicator