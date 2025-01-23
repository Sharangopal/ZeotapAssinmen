import React from 'react';
import { Bold, Italic, Type, Palette } from 'lucide-react';
import { useSheetStore } from '../store/sheetStore';

export const Toolbar: React.FC = () => {
  const { selectedCell, data, updateCell } = useSheetStore();

  const toggleStyle = (style: 'bold' | 'italic') => {
    if (!selectedCell) return;
    const currentCell = data[selectedCell];
    updateCell(selectedCell, {
      style: {
        ...currentCell?.style,
        [style]: !currentCell?.style[style]
      }
    });
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <button
        onClick={() => toggleStyle('bold')}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => toggleStyle('italic')}
        className="p-2 hover:bg-gray-100 rounded"
      >
        <Italic size={18} />
      </button>
      <div className="h-6 w-px bg-gray-300 mx-2" />
      <select
        onChange={(e) => {
          if (!selectedCell) return;
          updateCell(selectedCell, {
            style: {
              ...data[selectedCell]?.style,
              fontSize: parseInt(e.target.value)
            }
          });
        }}
        className="p-1 border rounded"
      >
        {[10, 12, 14, 16, 18, 20, 24].map(size => (
          <option key={size} value={size}>{size}px</option>
        ))}
      </select>
      <input
        type="color"
        onChange={(e) => {
          if (!selectedCell) return;
          updateCell(selectedCell, {
            style: {
              ...data[selectedCell]?.style,
              color: e.target.value
            }
          });
        }}
        className="w-8 h-8 p-1"
      />
    </div>
  );
};