import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// seed some initial student data
async function main(): Promise<void> {
    const students = [
        { name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', age: 21 },
        { name: 'Priya Patel', email: 'priya.patel@yahoo.com', age: 22 },
        { name: 'Amit Kumar', email: 'amit.kumar@outlook.com', age: 20 },
        { name: 'Sneha Reddy', email: 'sneha.reddy@gmail.com', age: 23 },
        { name: 'Vikram Singh', email: 'vikram.singh@hotmail.com', age: 21 },
        { name: 'Ananya Gupta', email: 'ananya.gupta@gmail.com', age: 22 },
    ]

    for (const student of students) {
        await prisma.student.upsert({
            where: { email: student.email },
            update: {},
            create: student,
        })
    }

    console.log('Seed data inserted ✅')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
