"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TodoSchema, type TodoFormValues } from "@/schemas/todo";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { createTodo } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormInput } from "@/components/form-input";

export default function CreateTodoForm() {
  const router = useRouter();
  
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });

  const onSubmit = async (values: TodoFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      if (values.description) {
        formData.append("description", values.description);
      }
      await createTodo(formData);
      form.reset();
      router.refresh();
      toast.success('Todo created successfully');
    } catch (error) {
      toast.error('Failed to create todo');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 border p-4 rounded-lg"
      >
        <FormInput
          control={form.control}
          name="title"
          label="Title"
          placeholder="Enter todo title"
        />
        <FormInput
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter todo description"
          isTextArea
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating..." : "Create Todo"}
        </Button>
      </form>
    </Form>
  );
}