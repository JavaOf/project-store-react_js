import React from "react";

function SearchSuggestions({ suggestions, onSelect }) {
  if (suggestions.length === 0) return null;

  return (
    <ul className="suggestions-list">
      {suggestions.map((suggestion) => (
        <li key={suggestion.id} onClick={() => onSelect(suggestion)}>
          {suggestion.name}
        </li>
      ))}
    </ul>
  );
}

export default SearchSuggestions;
