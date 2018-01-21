import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'Flashcard:Notifications'


export const pluralize = (num, thing) => {
  return num === 1 ? `${num} ${thing}` : `${num} ${thing}s`
}

export const  clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAlllScheduledNotificationsAsync)
}

const createNotification = () => {
  return {
    title: "Practice makes Perfect",
    body: "👋 to retain your memory, please try flash card everyday!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted' || status === 'undetermined') {
            Notifications.cancelAllScheduledNotificationsAsync()
            let tommorrow = new Date()
            tommorrow.setDate(tommorrow.getDate() + 1)
            tommorrow.setHours(20)
            tommorrow.setMinutes(0)

            const notificationSchedule = {
                time: tommorrow,
                repeat: 'day',
              }

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              notificationSchedule,
            )
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    }
  })
}
