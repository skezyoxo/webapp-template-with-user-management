import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.findUnique({
    where: { name: 'ADMIN' },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  console.log('Admin Role:', {
    id: adminRole?.id,
    name: adminRole?.name,
    description: adminRole?.description,
  });

  console.log('\nAdmin Permissions:');
  adminRole?.permissions.forEach(rp => {
    const p = rp.permission;
    console.log(`- ${p.name}: ${p.description} (${p.resource}:${p.action})`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
