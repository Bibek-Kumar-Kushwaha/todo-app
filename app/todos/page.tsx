import { getTodos } from "@/lib/actions";
import TodoList from "@/components/todo-list";
import SearchBar from "@/components/search-bar";
import PaginationControls from "@/components/pagination-controls";
import CreateTodoForm from "@/components/create-todo-form";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function TodosPage({ searchParams }: PageProps) {
  const awaitedSearchParams = await Promise.resolve(searchParams);
  const search = typeof awaitedSearchParams?.search === "string" ? awaitedSearchParams.search : undefined;
  const page = Number.isFinite(parseInt(awaitedSearchParams?.page as string))
    ? parseInt(awaitedSearchParams?.page as string)
    : 1;
  const limit = Number.isFinite(parseInt(awaitedSearchParams?.limit as string))
    ? parseInt(awaitedSearchParams?.limit as string)
    : 2;

  const { todos, total, totalPages, currentPage } = await getTodos(search, page, limit);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {search ? `Results for "${search}"` : "My Todos"}
        </h1>
        <SearchBar search={search} />
      </div>
      <CreateTodoForm />
      <TodoList todos={todos} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={total}
        limit={limit}
        search={search}
      />
    </div>
  );
}
