import { PrismaClient, RoleType } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const db = new PrismaClient();

export const start = async () => {
  const password = hashSync('123456');
  const newUser = await db.user.create({
    data: {
        firstname: "Enrique",
        lastname: "Lázaro",
        email: "enrique.lazaro@gmail.com",
        password,
        position: "CEO lc-project.com - Software Solutions",
        roleType: RoleType.ADMINISTRADOR
    }
  });

  // Crear una categoría
  const softwareCategory = await db.category.create({
    data: {
      name: "Software",
      description: "Publicaciones relacionadas con el desarrollo de software."
    }
  });

  // Crear una publicación asociada al usuario y a la categoría creados anteriormente
  await db.post.create({
    data: {
      title: "Introducción al Desarrollo de Software",
      content: `
        <h1>Introducción al Desarrollo de Software</h1>
        <p>El desarrollo de software es un campo fascinante y en constante evolución...</p>
        <p><strong>Enrique Lázaro</strong> comparte su experiencia...</p>
        <img src="https://example.com/image.jpg" alt="Software Development" />
      `,
      mainImageUrl: "https://example.com/image.jpg",
      authorId: newUser.id,
      categoryId: softwareCategory.id
    }
  });

  console.log('Seed data has been created successfully.');
};

start();