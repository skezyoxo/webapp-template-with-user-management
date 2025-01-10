import { PrismaClient } from '@prisma/client'

async function main() {
    console.log('Testing database connection...')

    const prisma = new PrismaClient()

    try {
        // Test the connection by attempting to count users
        const userCount = await prisma.user.count()
        console.log('Connection successful!')
        console.log(`Number of users in database: ${userCount}`)

        // Test role creation
        const defaultRole = await prisma.role.upsert({
            where: { name: 'USER' },
            update: {},
            create: {
                name: 'USER',
                description: 'Default user role',
                isDefault: true
            }
        })
        console.log('Default role created/verified:', defaultRole)

    } catch (error) {
        console.error('Error connecting to the database:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main() 