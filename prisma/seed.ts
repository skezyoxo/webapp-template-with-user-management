import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting seeding...')

    // Create roles
    const adminRole = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: {
            name: 'ADMIN',
            description: 'Administrator role with full access',
            isDefault: false
        }
    })

    const userRole = await prisma.role.upsert({
        where: { name: 'USER' },
        update: {},
        create: {
            name: 'USER',
            description: 'Default user role',
            isDefault: true
        }
    })

    // Create permissions
    const permissions = await Promise.all([
        // User permissions
        prisma.permission.upsert({
            where: { name: 'user:read' },
            update: {},
            create: {
                name: 'user:read',
                description: 'Can read user information',
                resource: 'user',
                action: 'read'
            }
        }),
        prisma.permission.upsert({
            where: { name: 'user:write' },
            update: {},
            create: {
                name: 'user:write',
                description: 'Can create and update users',
                resource: 'user',
                action: 'write'
            }
        }),
        prisma.permission.upsert({
            where: { name: 'user:delete' },
            update: {},
            create: {
                name: 'user:delete',
                description: 'Can delete users',
                resource: 'user',
                action: 'delete'
            }
        }),
        // Role permissions
        prisma.permission.upsert({
            where: { name: 'role:manage' },
            update: {},
            create: {
                name: 'role:manage',
                description: 'Can manage roles and permissions',
                resource: 'role',
                action: 'manage'
            }
        })
    ])

    // Assign permissions to roles
    // Admin gets all permissions
    await Promise.all(
        permissions.map(permission =>
            prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: adminRole.id,
                        permissionId: permission.id
                    }
                },
                update: {},
                create: {
                    roleId: adminRole.id,
                    permissionId: permission.id
                }
            })
        )
    )

    // Regular users only get user:read permission
    await prisma.rolePermission.upsert({
        where: {
            roleId_permissionId: {
                roleId: userRole.id,
                permissionId: permissions[0].id // user:read permission
            }
        },
        update: {},
        create: {
            roleId: userRole.id,
            permissionId: permissions[0].id
        }
    })

    // Create default users
    const adminPassword = await hash('admin123', 12)
    const userPassword = await hash('user123', 12)

    // Create admin user
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            passwordHash: adminPassword,
            displayName: 'Admin User',
            username: 'admin',
            roleId: adminRole.id,
            emailVerified: new Date(),
            active: true
        }
    })

    // Create regular user
    await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            passwordHash: userPassword,
            displayName: 'Regular User',
            username: 'user',
            roleId: userRole.id,
            emailVerified: new Date(),
            active: true
        }
    })

    console.log('Seeding completed!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) 