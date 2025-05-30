import { getTodos } from "@/lib/actions";
import TodoList from "@/components/todo-list";
import SearchBar from "@/components/search-bar";
import PaginationControls from "@/components/pagination-controls";
import CreateTodoForm from "@/components/create-todo-form";

export default async function TodosPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Wait for Next.js to resolve the URL params
  const { search, page, limit } = await props.searchParams.then(sp => ({
    search: typeof sp.search === 'string' ? sp.search : undefined,
    page: Number.isFinite(Number(sp.page)) ? Number(sp.page) : 1,
    limit: Number.isFinite(Number(sp.limit)) ? Number(sp.limit) : 2,
  }));

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