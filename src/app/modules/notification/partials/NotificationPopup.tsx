import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, useSearchParams } from "react-router-dom";
import { INotificationCountResponse, INotificationResponseP } from "../core/models/notification.interface";
import { fetchNotificationCount, fetchNotifications } from "../core/api/notification.request";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import NotificationPopupItem from "./NotificationPopupItem";
const NotificationPopup = () => {
    const [open, setOpen] = useState(false);
    const [notificationCountResponse, setNotificationCountResponse] = useState<
        INotificationCountResponse | undefined
    >();

    React.useEffect(() => {
        getNotificationCount();
    }, []);

    async function getNotificationCount() {
        fetchNotificationCount()
            .then((res) => {
                setNotificationCountResponse(res);
            })
            .catch(() => {
                console.log("Error");
            });
    }

    const [notificationsResponse, setNotificationsResponse] = React.useState<
        PageableResponseModel<INotificationResponseP> | undefined
    >();
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [searchParams] = useSearchParams();

    const [skip, setSkip] = React.useState<number>(
        parseInt(searchParams.get("skip") ?? "1")
    );


    React.useEffect(() => {
        fetchMoreNotifications();
    }, []);

    async function fetchMoreNotifications() {
        fetchNotifications({
            skip: skip,
            take: 10,
            status: "is_not_readed",
        }).then((res) => {
            if (res.meta.currentPage < res.meta.totalPages) {
                setSkip(res.meta.currentPage + 1);
                setHasMore(res.meta.currentPage < res.meta.totalPages);
            } else {
                setHasMore(false);
            }
            let newItems = [...(notificationsResponse?.items ?? []), ...res.items];
            setNotificationsResponse({ ...res, items: newItems });
        });
    }

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={clsx(
                    "relative justify-center gap-2 text-gray-700 shadow-md focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center",
                    {
                        "bg-gray-50": open,
                    }
                )}
            >
                <Icon
                    icon="iconamoon:notification"
                    className={clsx({
                        "text-red-500": open,
                        "text-gray-700": !open,
                    })}
                />
                {notificationCountResponse?.not_read ? (
                    <span className="w-4 h-4 absolute top-0 left-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-semibold leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                        {notificationCountResponse?.not_read}
                    </span>
                ) : null}
            </button>

            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <div
                    className={`z-20 min-w-72 sm:min-w-96 bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 top-12 transition-[max-height] duration-300 overflow-hidden ${open ? "max-h-screen" : "max-h-0"
                        }`}
                >
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 ">
                        Okunmamış Bildirimler
                    </div>
                    <div id="notificationDropdown" className="divide-y divide-gray-100 bg-white h-96 overflow-y-auto fancy-scrollbar">
                        <InfiniteScroll
                            scrollableTarget="notificationDropdown"
                            scrollThreshold={0.9}
                            dataLength={notificationsResponse?.items.length ?? 0}
                            next={fetchMoreNotifications}
                            hasMore={hasMore}
                            loader={<Spinner color="red" size="sm" />}
                            endMessage={
                                <p className="text-center text-gray-500 text-sm my-1">
                                    {notificationsResponse?.items.length ? "Başka okunmamış bildirimin yok" : "Bildirim bulunamadı."}
                                </p>
                            }>
                            {
                                notificationsResponse?.items?.map((notification, index) => (
                                    <NotificationPopupItem key={index} notification={notification} callback={async () => {
                                        await getNotificationCount();
                                    }} />
                                ))
                            }
                        </InfiniteScroll>


                    </div>
                    <Link
                        to="/bildirimler"
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100  "
                    >
                        <div className="inline-flex items-center ">
                            <svg
                                className="w-4 h-4 me-2 text-gray-500 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 14"
                            >
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                            </svg>
                            Tüm bildirimleri gör
                        </div>
                    </Link>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default NotificationPopup;
