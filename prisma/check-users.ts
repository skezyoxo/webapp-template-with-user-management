import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  users.forEach(user => {
    console.log(`\nUser: ${user.email}`);
    console.log(`Role: ${user.role.name}`);
    console.log('Permissions:');
    user.role.permissions.forEach(rp => {
      console.log(`- ${rp.permission.name}: ${rp.permission.description}`);
    });
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
