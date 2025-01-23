import React from 'react';
import { useSheetStore } from '../store/sheetStore';

export const FormulaBar: React.FC = () => {
  const { selectedCell, data, updateCell } = useSheetStore();

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <div className="font-mono bg-gray-100 px-2 py-1 rounded">
        {selectedCell || ''}
      </div>
      <input
        type="text"
        value={selectedCell ? data[selectedCell]?.formula || '' : ''}
        onChange={(e) => {
          if (!selectedCell) return;
          updateCell(selectedCell, {
            formula: e.target.value
          });
        }}
        placeholder="Enter formula or value"
        className="flex-1 px-2 py-1 border rounded"
      />
    </div>
  );
};