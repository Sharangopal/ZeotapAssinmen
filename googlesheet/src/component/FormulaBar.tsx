import React, { useState, useEffect, useRef } from 'react';
import { useSheetStore } from '../store/sheetStore';
import { formulaSuggestions } from '../utils/formulas';

export const FormulaBar: React.FC = () => {
  const { selectedCell, data, updateCell } = useSheetStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedCell) {
      setInputValue(data[selectedCell]?.formula || '');
    }
  }, [selectedCell, data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.startsWith('=')) {
      const functionPart = value.slice(1).toUpperCase();
      const matchingSuggestions = formulaSuggestions.filter(s => 
        s.name.startsWith(functionPart)
      );
      setSuggestions(matchingSuggestions.map(s => `${s.name}${s.params}`));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    if (selectedCell) {
      updateCell(selectedCell, { formula: value });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue('=' + suggestion);
    if (selectedCell) {
      updateCell(selectedCell, { formula: '=' + suggestion });
    }
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex items-center gap-2 p-2 border-b bg-white">
      <div className="font-mono bg-gray-200 px-2 py-1 rounded">
        fx
        {selectedCell || ''}
      </div>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter formula or value"
          className="w-full px-2 py-1 border rounded"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded shadow-lg z-50 max-h-48 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};