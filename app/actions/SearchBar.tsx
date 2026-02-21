"use client";
import { useRouter } from "next/navigation";

export default function SearchBar({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();

  const handleSearch = (term: string) => {
    if (term) {
      router.push(`/?q=${term}`); // Markaad wax qorto URL-ka ayuu bedelayaa
    } else {
      router.push(`/`); // Haddii aad tirtirto dhamaantood ayuu soo celinayaa
    }
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-3">🔍</span>
      <input
        type="text"
        placeholder="Raadi todo..."
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
    </div>
  );
}