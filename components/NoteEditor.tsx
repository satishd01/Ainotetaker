"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function NoteEditor({ initial, onSubmit, onCancel }: any) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initial || { title: "", content: "" } });

  useEffect(() => { reset(initial || { title: "", content: "" }); }, [initial]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded space-y-2">
      <input {...register("title")} placeholder="Title" className="input" />
      <textarea {...register("content")} placeholder="Write your note..." className="textarea" />
      <div className="flex gap-2">
        <button className="btn" type="submit">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>}
      </div>
    </form>
  );
}
