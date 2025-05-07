"use client";

import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ search }: { search?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    router.push(`/todos?${params.toString()}`);
  }, 300);

  return (
    <Input
      type="search"
      placeholder="Search todos..."
      defaultValue={search}
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-sm"
    />
  );
}