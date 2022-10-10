import React from 'react';
import { useSelector } from 'react-redux';

function Notification(props) {
    let spriteIcon;
    const notifications = useSelector((state) => state.ui.notifications);
    const notificationIsVisible = useSelector((state) => state.ui.notificationIsVisible);
    const notificationDispaly = notifications.map((notification) => {
        if (notification.type === 'warning') {
            spriteIcon = '.iconwarning1';
        } else if (notification.type === 'success') {
            spriteIcon = '.iconcheck-square1';
        } else if (notification.type === 'failure') {
            spriteIcon = '.iconx';
        }
        return (
            <div
                className={notificationIsVisible ? 'notification notification-on' : 'notification'}
                ref={props.notificationRef}
            >
                <svg className="notification-icon">
                    <use xlinkHref={`images/sprite.svg#${spriteIcon}`}></use>
                </svg>
                <p className="notification-content">{notification.message}</p>
            </div>
        );
    });
    return (
        <>
            <div className="notifications-container">{notificationDispaly}</div>
        </>
    );
}

export default Notification;
