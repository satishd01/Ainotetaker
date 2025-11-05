"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex items-center">
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by title..." className="input" />
      <button onClick={() => onSearch(q)} className="btn">Search</button>
    </div>
  );
}
