import { create } from 'zustand';
import { CellData, SheetState } from '../types/sheet';
import { evaluateFormula } from '../utils/formulas';

interface SheetStore extends SheetState {
  rowHeights: any;
  columnWidths: any;
  updateCell: (id: string, data: Partial<CellData>) => void;
  setSelectedCell: (id: string | null) => void;
  setSelectedRange: (range: string[]) => void;
  updateColumnWidth: (column: string, width: number) => void;
  updateRowHeight: (row: string, height: number) => void;
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

      return {
        data: {
          ...state.data,
          [id]: updatedData
        }
      };
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
    }))
}));