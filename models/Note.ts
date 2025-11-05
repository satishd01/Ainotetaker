// models/Note.ts
import mongoose, { Document, Model } from "mongoose";

export interface INote extends Document {
  userId: string;
  title: string;
  content: string;
  tags?: string[];
}

const NoteSchema = new mongoose.Schema<INote>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Note: Model<INote> = (mongoose.models.Note as Model<INote>) || mongoose.model("Note", NoteSchema);
export default Note;
