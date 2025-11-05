// components/AIButton.tsx
"use client";

type AIButtonProps = {
  note: { _id: string; title: string; content: string };
  onApply: (content: string) => void;
};

export default function AIButton({ note, onApply }: AIButtonProps) {
  const handleClick = () => {
    // Simple example AI improve (replace with OpenAI API call)
    const improved = note.content + " (AI improved)";
    onApply(improved);
  };

  return (
    <button
      onClick={handleClick}
      className="px-2 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
    >
      AI Improve
    </button>
  );
}
