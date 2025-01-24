import { create } from 'zustand';
import { CellData, SheetState } from '../types/sheet';
import { evaluateFormula } from '../utils/formulas';
import Papa from 'papaparse';

interface SheetStore extends SheetState {
  updateCell: (id: string, data: Partial<CellData>) => void;
  setSelectedCell: (id: string | null) => void;
  setSelectedRange: (range: string[]) => void;
  updateColumnWidth: (column: string, width: number) => void;
  updateRowHeight: (row: string, height: number) => void;
  importCSV: (csvContent: string) => void;
}

export const useSheetStore = create<SheetStore>((set, get) => ({
  data: {},
  selectedCell: null,
  selectedRange: [],
  columnWidths: {},
  rowHeights: {},

  updateCell: (id, newData) => {
    set((state) => {
      const currentData = state.data[id] || {
        value: '',
        formula: '',
        style: { bold: false, italic: false, fontSize: 14, color: '#000000' }
      };
      
      const updatedData = {
        ...currentData,
        ...newData
      };

      if (updatedData.formula) {
        updatedData.value = evaluateFormula(updatedData.formula, state.data);
      }

      // Update dependent cells
      const newState = {
        data: {
          ...state.data,
          [id]: updatedData
        }
      };

      // Find and update cells that depend on this cell
      Object.entries(state.data).forEach(([cellId, cellData]) => {
        if (cellData.formula?.includes(id)) {
          newState.data[cellId] = {
            ...cellData,
            value: evaluateFormula(cellData.formula, newState.data)
          };
        }
      });

      return newState;
    });
  },

  setSelectedCell: (id) => set({ selectedCell: id }),
  setSelectedRange: (range) => set({ selectedRange: range }),
  
  updateColumnWidth: (column, width) =>
    set((state) => ({
      columnWidths: { ...state.columnWidths, [column]: width }
    })),
    
  updateRowHeight: (row, height) =>
    set((state) => ({
      rowHeights: { ...state.rowHeights, [row]: height }
    })),

  importCSV: (csvContent) => {
    Papa.parse(csvContent, {
      complete: (results: { data: string[][]; }) => {
        const newData: { [key: string]: CellData } = {};
        results.data.forEach((row: string[], rowIndex) => {
          row.forEach((cell, colIndex) => {
            const cellId = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
            newData[cellId] = {
              value: cell,
              formula: cell,
              style: { bold: false, italic: false, fontSize: 14, color: '#000000' }
            };
          });
        });
        set({ data: newData });
      }
    });
  }
}));