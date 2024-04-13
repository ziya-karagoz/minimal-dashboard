import React from "react";
import { INotificationResponseP } from "../core/models/notification.interface";
import { PageableResponseModel } from "@base/components/common/dynamic-table/core/models";
import { useSearchParams } from "react-router-dom";
import { fetchNotifications } from "../core/api/notification.request";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@base/components/common/spinner/Spinner";
import NotificationItem from "./partials/NotificationItem";
import clsx from "clsx";

const NotificationList = () => {
    const [notificationsResponse, setNotificationsResponse] = React.useState<
        PageableResponseModel<INotificationResponseP> | undefined
    >();
    const [hasMore, setHasMore] = React.useState<boolean>(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [skip, setSkip] = React.useState<number>(
        parseInt(searchParams.get("skip") ?? "1")
    );

    const status = searchParams.get("status") ?? "is_not_readed";

    React.useEffect(() => {
        fetchMoreNotifications();
    }, [status]);

    function fetchMoreNotifications() {
        fetchNotifications({
            skip: skip,
            take: 10,
            status: status,
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

    const handleStatusChange = (newStatus: string) => {
        setSearchParams({ status: newStatus });
        setNotificationsResponse(undefined);
        setSkip(1);
        setHasMore(true);
    };

    return (
        <div className="bg-white rounded-xl mx-auto border border-gray-100 p-10 shadow-sm">
            <div className="inline-flex items-center justify-between w-full">
                <h3 className="font-bold text-lg sm:text-xl text-gray-800">
                    Bildirimler
                </h3>
                <div className="inline-flex rounded-lg shadow-sm mb-2">
                    <button
                        onClick={() => {
                            handleStatusChange("is_not_readed");
                        }}
                        type="button"
                        className={clsx("py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border disabled:opacity-50 disabled:pointer-events-none", {
                            "border-red-200 bg-white text-red-800 shadow-sm hover:bg-red-50": status === "readed",
                            "border-red-700 bg-red-700 text-white": status === "is_not_readed",
                        })}                    >
                        Okunmamış Bildirimler
                    </button>
                    <button
                        onClick={() => {
                            handleStatusChange("readed");
                        }}
                        type="button"
                        className={clsx("py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border disabled:opacity-50 disabled:pointer-events-none", {
                            "border-red-200 bg-white text-red-800 shadow-sm hover:bg-red-50": status === "is_not_readed",
                            "border-red-700 bg-red-700 text-white": status === "readed",
                        })}
                    >
                        Okunmuş Bildirimler
                    </button>
                </div>
            </div>
            <InfiniteScroll
                scrollThreshold={0.9}
                dataLength={notificationsResponse?.items.length ?? 0}
                next={fetchMoreNotifications}
                hasMore={hasMore}
                loader={<Spinner color="red" size="xs" />}
                endMessage={
                    <p className="text-center text-gray-500 text-sm my-1">
                        {notificationsResponse?.items.length ? "Tüm bildirimler yüklendi." : "Bildirim bulunamadı."}
                    </p>
                }
            >
                {notificationsResponse?.items.map((notification, index) => (
                    <NotificationItem key={index} notification={notification} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default NotificationList;
