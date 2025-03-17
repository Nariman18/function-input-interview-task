"use client";
import React, { useRef, useState } from "react";
import { Tag, useFormulaStore } from "@/store/formula-store";
import { useAutocomplete } from "@/hooks/autocomplete-fetch";
import Tags from "./tag";

function FormulaInput() {
  const { setFormula, addTag, tags, removeTag, updateTag } = useFormulaStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: suggestions } = useAutocomplete(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Allowing only numbers, operators, and variables
    if (/^[0-9+\-*/^()]*$/.test(value)) {
      setFormula(value);
    }
  };

  const handleSelectSuggestion = (tag: Tag) => {
    addTag(tag);
    setQuery("");
    inputRef.current?.focus(); // Focusing back on input after selection
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && query === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1].id); // Removing last tag on backspace
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="z-10 border p-2 border-gray-600 rounded-2xl flex items-center flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Tags
            key={index}
            tag={tag}
            onUpdate={updateTag}
            onRemove={removeTag}
          />
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter formula..."
          className="flex-1 border-none outline-none"
        />
      </div>

      {suggestions?.length > 0 && (
        <div className="relative h-[250px] overflow-x-auto border border-gray-300 p-2 rounded-lg bg-white">
          {suggestions.map((tag: Tag, index: number) => (
            <div
              className="cursor-pointer p-2 hover:bg-gray-200"
              key={index}
              onClick={() => handleSelectSuggestion(tag)}
            >
              {tag.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormulaInput;
