import React, { useRef, useEffect } from 'react';
import { useSheetStore } from '../store/sheetStore';
import clsx from 'clsx';

const COLUMNS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const ROWS = Array.from({ length: 100 }, (_, i) => i + 1);

export const Grid: React.FC = () => {
  const {
    data,
    selectedCell,
    updateCell,
    setSelectedCell,
    columnWidths,
    rowHeights,
    updateRowHeight
  } = useSheetStore();

  const getCellId = (col: string, row: number) => `${col}${row}`;
  const cellRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const updateCellHeight = (cellId: string) => {
    const element = cellRefs.current[cellId];
    if (element) {
      const row = parseInt(cellId.replace(/[A-Z]/g, ''));
      const scrollHeight = element.scrollHeight;
      if (scrollHeight > 32) { // 32px is the default height (h-8 = 2rem = 32px)
        updateRowHeight(row.toString(), scrollHeight);
      }
    }
  };

  useEffect(() => {
    if (selectedCell) {
      updateCellHeight(selectedCell);
    }
  }, [selectedCell, data]);

  return (
    <div className="overflow-auto flex-1">
      <div className="inline-block min-w-full">
        <div className="grid" style={{
          gridTemplateColumns: `40px ${COLUMNS.map(col => 
            `${columnWidths[col] || 100}px`).join(' ')}`
        }}>
          {/* Header row */}
          <div className="sticky top-0 z-10 bg-gray-100 border-b border-r h-8 flex items-center justify-center">
            #
          </div>
          {COLUMNS.map(col => (
            <div
              key={col}
              className="sticky top-0 z-10 bg-gray-100 border-b border-r h-8 flex items-center justify-center"
            >
              {col}
            </div>
          ))}

          {/* Grid cells */}
          {ROWS.map(row => (
            <React.Fragment key={row}>
              <div className="sticky left-0 bg-gray-100 border-b border-r w-10 h-8 flex items-center justify-center">
                {row}
              </div>
              {COLUMNS.map(col => {
                const cellId = getCellId(col, row);
                const cellData = data[cellId];
                const rowHeight = rowHeights[row] || 32; // Default to 32px (h-8)

                return (
                  <div
                    key={cellId}
                    ref={el => cellRefs.current[cellId] = el}
                    className={clsx(
                      'border-b border-r px-2 outline-none',
                      selectedCell === cellId ? 'bg-blue-50 min-h-[32px] whitespace-pre-wrap break-words' : 'overflow-hidden whitespace-nowrap text-ellipsis',
                      'transition-all duration-200'
                    )}
                    style={{
                      fontWeight: cellData?.style.bold ? 'bold' : 'normal',
                      fontStyle: cellData?.style.italic ? 'italic' : 'normal',
                      fontSize: `${cellData?.style.fontSize || 14}px`,
                      color: cellData?.style.color || '#000000',
                      height: `${rowHeight}px`,
                      minHeight: '32px'
                    }}
                    onClick={() => setSelectedCell(cellId)}
                    contentEditable
                    onInput={(e) => {
                      if (selectedCell === cellId) {
                        updateCellHeight(cellId);
                      }
                    }}
                    onBlur={(e) => {
                      updateCell(cellId, {
                        formula: e.currentTarget.textContent || ''
                      });
                    }}
                    suppressContentEditableWarning
                  >
                    {cellData?.value || ''}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};