import { client, db } from "."
import { goalCompletions, goals } from "./schema"
import dayjs from 'dayjs'

async function seed() {
    await db.delete(goalCompletions)
    await db.delete(goals)

const result = await db
    .insert(goals).values ([
        { title: 'Acordar cedo', desiredWeeklyFrequency: 5},
        { title: 'Exercitar-se', desiredWeeklyFrequency: 3 },
        { title: 'Aprender algo sobre programação', desiredWeeklyFrequency: 7 }
    ]).returning()

    const startOfWeek = dayjs().startOf('week')

    await db.insert(goalCompletions).values ([
        { goalId: result[0].id, createdAt: startOfWeek.toDate() },
        { goalId: result[1].id, createdAt: startOfWeek.toDate() },
        { goalId: result[2].id, createdAt: startOfWeek.toDate() }
    ])
}

seed().finally(() => {
    client.end()
})