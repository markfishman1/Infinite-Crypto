import { uiActions } from '../reducers/ui-reducer';

export const pushNotification = (notification, notifications) => {
    return (dispatch) => {
        console.log('notifications', notifications);
        const notificationsCopy = [...notifications];
        notificationsCopy.push(notification);
        // popNotification(notificationsCopy);
        dispatch(uiActions.setNotifications(notificationsCopy));
        const anotherDummyCopy = [...notificationsCopy];
        const timeOutId = setTimeout(() => {
            console.log('counting back and deleting');
            anotherDummyCopy.pop();
            console.log('Notification array after deleting', anotherDummyCopy);
            dispatch(uiActions.setNotifications(anotherDummyCopy));
            clearTimeout(timeOutId);
        }, 2000);
    };
};

export const popNotification = (notifications) => {
    return (dispatch) => {
        notifications.pop();
        setTimeout(() => {
            console.log('counting back', notifications);
            dispatch(uiActions.setNotifications(notifications));
        }, 1500);
    };
};
