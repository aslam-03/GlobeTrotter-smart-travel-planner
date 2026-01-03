import prisma from './lib/prisma';
import { hashPassword } from './lib/auth';

async function createAdmin() {
  const password = await hashPassword('Admin@123');
  await prisma.user.create({
    data: {
      email: 'admin@globetrotter.com',
      password,
      role: 'ADMIN',
      name: 'Admin User',
    },
  });
}

createAdmin();