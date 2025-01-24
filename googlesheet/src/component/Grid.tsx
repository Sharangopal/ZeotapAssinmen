import React, { useRef, useEffect } from 'react';
import { useSheetStore } from '../store/sheetStore';
import clsx from 'clsx';

const COLUMNS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const ROWS = Array.from({ length: 100 }, (_, i) => i + 1);

export const Grid: React.FC = () => {
  const {
    data,
    selectedCell,
    selectedRange,
    updateCell,
    setSelectedCell,
    setSelectedRange,
    columnWidths,
    rowHeights,
    updateRowHeight
  } = useSheetStore();

  const getCellId = (col: string, row: number) => `${col}${row}`;
  const cellRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const selectionStart = useRef<string | null>(null);

  const updateCellHeight = (cellId: string) => {
    const element = cellRefs.current[cellId];
    if (element) {
      const row = parseInt(cellId.replace(/[A-Z]/g, ''));
      const scrollHeight = element.scrollHeight;
      if (scrollHeight > 32) {
        updateRowHeight(row.toString(), scrollHeight);
      }
    }
  };

  useEffect(() => {
    if (selectedCell) {
      updateCellHeight(selectedCell);
    }
  }, [selectedCell, data]);

  const handleMouseDown = (cellId: string) => {
    setSelectedCell(cellId);
    selectionStart.current = cellId;
    setSelectedRange([cellId]);
  };

  const handleMouseEnter = (cellId: string) => {
    if (selectionStart.current) {
      const range = getCellRange(selectionStart.current, cellId);
      setSelectedRange(range);
    }
  };

  const handleMouseUp = () => {
    selectionStart.current = null;
  };

  const getCellRange = (start: string, end: string): string[] => {
    const startCol = start.match(/[A-Z]+/)?.[0] || '';
    const startRow = parseInt(start.match(/\d+/)?.[0] || '0');
    const endCol = end.match(/[A-Z]+/)?.[0] || '';
    const endRow = parseInt(end.match(/\d+/)?.[0] || '0');

    const startColIndex = COLUMNS.indexOf(startCol);
    const endColIndex = COLUMNS.indexOf(endCol);
    const minCol = Math.min(startColIndex, endColIndex);
    const maxCol = Math.max(startColIndex, endColIndex);
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);

    const range: string[] = [];
    for (let col = minCol; col <= maxCol; col++) {
      for (let row = minRow; row <= maxRow; row++) {
        range.push(`${COLUMNS[col]}${row}`);
      }
    }
    return range;
  };

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
                const rowHeight = rowHeights[row] || 32;
                const isSelected = selectedRange.includes(cellId);

                return (
                  <div
                    key={cellId}
                    ref={el => cellRefs.current[cellId] = el}
                    className={clsx(
                      'border-b border-r px-2 outline-none',
                      isSelected ? 'bg-blue-50' : '',
                      selectedCell === cellId ? 'ring-2 ring-blue-400' : '',
                      'min-h-[32px] whitespace-pre-wrap break-words',
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
                    onMouseDown={() => handleMouseDown(cellId)}
                    onMouseEnter={() => handleMouseEnter(cellId)}
                    onMouseUp={handleMouseUp}
                    contentEditable
                    onInput={(e) => {
                      updateCellHeight(cellId);
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