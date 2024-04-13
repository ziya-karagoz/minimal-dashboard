import BottomNavigation from "@base/components/common/bottom-navigation/BottomNavigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const CBottomNavigation = () => {
    return (
        <>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Colors</h5>
                <div>
                    <BottomNavigation
                        type="appbar"
                        items={[
                            {
                                content: "Home",
                                icon: <Icon icon="bx:bx-home" />,
                                to: "/dashboard",
                            },
                            {
                                content: "Search",
                                icon: <Icon icon="bx:bx-search" />,
                                to: "/search",
                            },
                            {
                                content: "Favorites",
                                icon: <Icon icon="bx:bx-heart" />,
                                to: "/favorites",
                            },
                            {
                                content: "Settings",
                                icon: <Icon icon="bx:bx-cog" />,
                                to: "/settings",
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default CBottomNavigation;
