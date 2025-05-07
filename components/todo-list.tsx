"use client"
import { useState } from "react";
import { deleteTodo, toggleTodo, updateTodo } from "@/lib/actions";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TodoList({ todos }: { todos: any[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("completed", completed.toString());
      await toggleTodo(formData);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      await deleteTodo(formData);
      router.refresh();
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const handleEdit = (todo: any) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const handleUpdate = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", editTitle);
      formData.append("description", editDescription);
      await updateTodo(formData);
      router.refresh();
      toast.success("Todo updated");
      setEditingId(null);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No todos found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center space-x-4 w-full">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) =>
                handleToggle(todo.id, checked as boolean)
              }
            />

            {editingId === todo.id ? (
              <div className="flex flex-col space-y-1 w-full">
                <input
                  className="border px-2 py-1 rounded"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  className="border px-2 py-1 rounded text-sm"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <div className="space-x-2 mt-2">
                  <Button onClick={() => handleUpdate(todo.id)} size="sm">
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditingId(null)}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>
                <h3 className="font-medium">{todo.title}</h3>
                {todo.description && (
                  <p className="text-sm text-muted-foreground">
                    {todo.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {editingId !== todo.id && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(todo)}
              >
                <Pencil className="h-4 w-4 text-blue-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(todo.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
