// components/NoteCard.tsx
"use client";

import AIButton from "./AIButton";

type Note = { _id: string; title: string; content: string };
type NoteCardProps = {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onUpdate: (update: { id: string; title: string; content: string }) => void;
};

export default function NoteCard({ note, onEdit, onDelete, onUpdate }: NoteCardProps) {
  return (
    <div className="p-4 border rounded-md bg-white/5">
      <h3 className="font-semibold">{note.title || "Untitled Note"}</h3>
      <p className="text-sm line-clamp-3">{note.content}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={onEdit} className="px-2 py-1 rounded border hover:bg-white/10 transition">
          Edit
        </button>
        <button onClick={onDelete} className="px-2 py-1 rounded border border-red-500 hover:bg-red-500 hover:text-white transition">
          Delete
        </button>
        <AIButton note={note} onApply={(content) => onUpdate({ id: note._id, title: note.title, content })} />
      </div>
    </div>
  );
}
