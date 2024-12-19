# OneSignal Push Notifications
> [!WARNING]  
> By using OneSignal free tier account, there are some limitations, such as the total tags by users that is setted to 2. 

## 🔖 Tags
Tags are created on code and are used as filters.

- **user_name:**  when a user sign-in, a name is stored. On sign out this tag is removed.
- **last_exercise:** when user marks a exercise as done, this tag value is changed to the time the actions was done.
- **week_start_date:** when an exercise is marked as done, this value is set to be the first day of the week (sunday).
- **week_exercises_count:** when an exercise is marked as done the counter sums, if *week_start_date* changes, the count is set to 1.

---

## 📋 Segments
It was tags to configure some segments to send the notifications.

### 1️⃣ Authenticated users
| Tag       | Where  |
| ---       | ---    |
| user_name | exists |

### 2️⃣ Unauthenticated users
| Tag       | Where          |
| ---       | ---            |
| user_name | does not exist |

### 3️⃣ Last exercise
| Tag           | Where                     | Value | Unit |
| ---           | ---                       | ---   | ---  |
| user_name     | exists                    | -     | -    |
| last_exercise | exists                    | -     | -    |
| last_exercise | time elapsed greater than | 2     | days |

### 4️⃣ Weekly report
| Tag                  | Where  | Value      |
| ---                  | ---    | ---        |
| user_name            | exists | -          |
| week_exercises_count | exists | -          |
| week_start_date      | is     | 2024-12-15 |

---

## 📢 Notifications
Check it out some example on how to send a notification.

### 1️⃣ Authenticated users
---
You are able to send a notification about a new exercise available:

| Propery        | Value                                                                   |
| --------       | --------                                                                |
| **Segment**    | Authenticated users                                                     |
| **Title**      | New Exercise Alert! 💪🏼                                                  |
| **Content**    | A fresh exercise just dropped! Check it out and level up your training. |
| **Launch URL** | `ignitegym://exercise/{id}`                                             |

---

### 2️⃣ Unauthenticated users
---
If the user isn't authenticated, it is possible to send a notification instructing them to authenticate or register:

| Propery        | Value                                                                            |
| --------       | --------                                                                         |
| **Segment**    | Unauthenticated users                                                            |
| **Title**      | Unlock Your Training Journey! 🥵                                                 |
| **Content**    | Access personalized workouts, track your progress, and reach your fitness goals! |
| **Launch URL** | `ignitegym://signin`                                                             |

---

### 3️⃣ Last exercise done
---
It can be sent a notification when a authenticated user have not been exercising during some time defined on segments.

| Propery        | Value                                                                               |
| --------       | --------                                                                            |
| **Segment**    | Last exercise done                                                                  |
| **Title**      | Let’s Get Back on Track! 💪🏼                                                         |
| **Content**    | Your goals are waiting! Jump back into your training today and keep moving forward. |
| **Launch URL** | `ignitegym://home`                                                                  |

---

### 4️⃣ Weekly report
---
At the end of the week it is possible to send a notification about the average of exercises done over this peiod.

| Propery        | Value                                                                                                                 |
| --------       | --------                                                                                                              |
| **Segment**    | Weekly report                                                                                                         |
| **Title**      | Weekly Workout Recap 🏋🏼‍♂️                                                                                               |
| **Content**    | You averaged {{ week_exercises_count &#124; default: '1' }} exercises this week! Keep it up and aim even higher next week. |
| **Launch URL** | `ignitegym://history`                                                                                                 |