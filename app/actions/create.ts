"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";

export async function createTodoAction(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const title = formData.get("title") as string;
const priority = formData.get("priority") as string;

  if (!title || title.trim().length === 0) {
    return { error: "Fadlan qor waxa kuu qorsheysan!" };
  }

  // Halkan waxaan u gudbineynaa title iyo priority labadaba
  await createTodo({ 
    title: title.trim(), 
    priority: priority 
  });

  revalidatePath("/");
  redirect("/");
}