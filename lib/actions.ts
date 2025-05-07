"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "./generated/prisma";

// Helper function to get the internal user ID
async function getInternalUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    throw new Error("User not found in database");
  }

  return user.id;
}

export async function createTodo(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  // First, ensure the user exists in our database
  const user = await prisma.user.upsert({
    where: { clerkId },
    create: {
      clerkId,
      email: "", 
      name: "", 
    },
    update: {},
  });

  // Then create the todo with the proper user association
  await prisma.todo.create({
    data: {
      title,
      description,
      userId: user.id,
    },
  });

  revalidatePath("/todos");
}

export async function updateTodo(formData: FormData) {
  const internalUserId = await getInternalUserId();
  
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const completed = formData.get("completed") === "on";

  await prisma.todo.update({
    where: {
      id,
      userId: internalUserId,
    },
    data: {
      title,
      description,
      completed,
    },
  });

  revalidatePath("/todos");
}

export async function deleteTodo(formData: FormData) {
  const internalUserId = await getInternalUserId();
  
  const id = formData.get("id") as string;

  await prisma.todo.delete({
    where: {
      id,
      userId: internalUserId,
    },
  });

  revalidatePath("/todos");
}

export async function toggleTodo(formData: FormData) {
  const internalUserId = await getInternalUserId();

  const id = formData.get("id") as string;
  const completed = formData.get("completed") === "true"; 

  await prisma.todo.update({
    where: {
      id,
      userId: internalUserId,
    },
    data: {
      completed, 
    },
  });

  revalidatePath("/todos");
}

export async function getTodos(search?: string, page = 1, limit = 10) {
  const internalUserId = await getInternalUserId();
  
  const skip = (page - 1) * limit;

  const where: Prisma.TodoWhereInput = {
    userId: internalUserId,
    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          description: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    }),
  };

  const [todos, total] = await Promise.all([
    prisma.todo.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.todo.count({ where }),
  ]);

  return {
    todos,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getUserProfile() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    throw new Error("Unauthorized");
  }

  return await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}
