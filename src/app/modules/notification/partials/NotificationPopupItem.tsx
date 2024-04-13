import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect } from 'react'
import moment from "@base/helpers/enhencers/Moment";
import { INotificationResponseP } from '../core/models/notification.interface';
import { readSingleNotification } from '../core/api/notification.request';
import clsx from 'clsx';

type NotificationPopupItemProps = {
    notification: INotificationResponseP;
    callback: () => void;
}
const NotificationPopupItem: React.FC<NotificationPopupItemProps> = ({ notification, callback }) => {

    const [collapsed, setCollapsed] = React.useState<boolean>(true);
    const [isReadCalled, setIsReadCalled] = React.useState<boolean>(false);
    useEffect(() => {
        if (!isReadCalled && !collapsed && notification.is_readed === false) {
            readSingleNotification(notification.id).then(() => {
                setIsReadCalled(true);
                callback();
            });
        }
    }, [collapsed, notification.id]);

    return (
        <div>
            <div
                className={clsx("flex px-4 py-3 bg-gray-50 hover:bg-gray-50 relative cursor-pointer", {
                    "bg-white hover:bg-white": isReadCalled
                })}
                onClick={() => setCollapsed((prev) => !prev)}
            >
                <div className="flex-shrink-0">
                    <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-500 rounded-full">
                        <Icon icon="iconamoon:notification" />
                    </span>

                </div>
                <div className="w-full ps-3">
                    <div className="text-gray-500 text-sm mb-1.5 ">
                        <span className="font-semibold text-gray-900 ">
                            {notification.title}
                        </span>

                    </div>
                    <div className="text-xs text-red-600 ">{moment(notification.created_at).fromNow()}</div>
                </div>
            </div>
            <div className={clsx(" bg-white transition-all duration-300", {
                "h-0": collapsed,
                "h-24": !collapsed,


            })}>
                {
                    collapsed ? null : (
                        <p className="mx-4 my-2.5 text-sm text-gray-600 w-[95%]">
                            {notification.content}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default NotificationPopupItem