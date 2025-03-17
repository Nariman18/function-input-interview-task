"use client";
import React, { useState } from "react";
import { Tag } from "@/store/formula-store";

interface TagProps {
  tag: Tag;
  onUpdate: (id: string, newLabel: string) => void;
  onRemove: (id: string) => void;
}

const Tags: React.FC<TagProps> = ({ tag, onUpdate, onRemove }) => {
  const [open, setOpen] = useState(false);
  const [newLabel, setNewLabel] = useState(tag.label);

  return (
    <div className="relative flex items-center border rounded-md px-2 py-1 bg-gray-200">
      {newLabel}
      <button onClick={() => setOpen(!open)} className="ml-2">
        ▼
      </button>

      {open && (
        <div className="absolute top-9 left-0 bg-white border shadow-md rounded-lg w-24">
          <input
            type="text"
            className="w-full p-1 border rounded-md"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <button
            className="block w-full text-left p-2 hover:bg-gray-200"
            onClick={() => {
              onUpdate(tag.id, newLabel);
              setOpen(false);
            }}
          >
            Save
          </button>
          <button
            className="block w-full text-left p-2 hover:bg-red-200 text-red-600"
            onClick={() => onRemove(tag.id)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Tags;
