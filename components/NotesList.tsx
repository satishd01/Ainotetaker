// components/NotesList.tsx
"use client";
import { useState, useEffect } from "react";
import NoteCard from "./NoteCard";

type Note = { _id: string; title: string; content: string };

export default function NotesList({ userId }: { userId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch(`/api/notes?userId=${userId}`);
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    }
    fetchNotes();
  }, [userId]);

  const handleUpdate = (update: { id: string; title: string; content: string }) => {
    setNotes((prev) =>
      prev.map((n) => (n._id === update.id ? { ...n, content: update.content } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {notes.length === 0 && <p>No notes yet</p>}
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={() => console.log("edit", note._id)}
          onDelete={() => handleDelete(note._id)}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
