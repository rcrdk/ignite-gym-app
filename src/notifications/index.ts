import dayjs from 'dayjs'
import { OneSignal } from 'react-native-onesignal'

/**
 * Note:
 * If you're using One Signal free tier, users can only have
 * two tags and for testing you might need comment one or
 * more functions contents for testing.
 */

export function notificationAddTagName(name: string) {
  OneSignal.User.addTag('user_name', name)
}

export function notificationRemoveTagName() {
  OneSignal.User.removeTag('user_name')
}

export function notificationLastExercise() {
  OneSignal.User.addTag('last_exercise', String(Math.floor(Date.now() / 1000)))
}

export async function notificationWeekExercises() {
  const currentWeekStartDate = dayjs().startOf('week').format('YYYY-MM-DD')
  const tags = await OneSignal.User.getTags()
  OneSignal.User.addTag('week_start_date', currentWeekStartDate)
  if (
    tags.week_exercises_count &&
    tags.week_start_date &&
    tags.week_start_date === currentWeekStartDate
  ) {
    const counter = Number(tags.week_exercises_count) + 1
    OneSignal.User.addTag('week_exercises_count', String(counter))
  } else {
    OneSignal.User.addTag('week_exercises_count', '1')
  }
}
