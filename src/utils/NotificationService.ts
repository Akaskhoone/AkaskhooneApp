import PushNotification from 'react-native-push-notification';
import { getActionsFor } from 'src/libs/Paginator';
import { selectors } from 'src/reducers';
import { store } from 'src/store';
import I18n from 'src/utils/i18n';
import { NotificationDTO, NotificationTypes } from 'src/utils/interfaces';

let notificationInterval;

const notificationActions = getActionsFor('notifications');
const notificationEndpoint = notificationActions.createEndpoint('/social/notification/');
async function handleNotificationnInterval() {
  const notifications = await getNotifications();
  const filteredNotifications = filterNotifications(notifications);
  showNotifications(filteredNotifications);
  setLastNotification(filteredNotifications[filteredNotifications.length - 1]);
}

function getNotifications() {
  return store.dispatch(notificationEndpoint.loadItem(''));
}

function filterNotifications(notifications: NotificationDTO[]): NotificationDTO[] {
  const lastNotificationId = selectors.notifications.getMeta(
    store.getState(),
    'lastNotificationId'
  );
  const lastNotificationIndex = notifications.findIndex(value => value.id === lastNotificationId);

  if (lastNotificationIndex === -1) return [];
  return notifications.slice(lastNotificationIndex);
}

function showNotifications(notifications: NotificationDTO[]) {
  notifications.forEach(el => showNotification(el));
}

function showNotification(notification: NotificationDTO) {
  let notificationMessage;
  switch (notification.type) {
    case NotificationTypes.like:
      notificationMessage = I18n.t('likeNotification', { username: notification.creator });
      break;
    case NotificationTypes.dislike:
      notificationMessage = I18n.t('dislikeNotification', { username: notification.creator });
      break;
    case NotificationTypes.follow:
      notificationMessage = I18n.t('followNotification', { username: notification.creator });
      break;
    case NotificationTypes.unfollow:
      notificationMessage = I18n.t('unfollowNotification', { username: notification.creator });
      break;
    case NotificationTypes.join:
      notificationMessage = I18n.t('joinNotification', { username: notification.creator });
      break;
  }
  PushNotification.localNotification({
    message: notificationMessage, // (required)
    autoCancel: true // (optional) default: true
  });
}

function setLastNotification(lastNotification) {
  notificationActions.setMeta({
    lastNotification
  });
}

function stopInterval() {
  clearInterval(notificationInterval);
}
function startInterval() {
  notificationInterval = setInterval(handleNotificationnInterval, 60000);
}

export default {
  stopInterval,
  startInterval
};
