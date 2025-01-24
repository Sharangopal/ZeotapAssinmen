export interface CellData {
    value: string;
    formula: string;
    style: CellStyle;
  }
  
  export interface CellStyle {
    bold: boolean;
    italic: boolean;
    fontSize: number;
    color: string;
  }
  
  export interface SheetState {
    data: { [key: string]: CellData };
    selectedCell: string | null;
    selectedRange: string[];
    columnWidths: { [key: string]: number };
    rowHeights: { [key: string]: number };
  }

  export interface SheetState {
    data: { [key: string]: CellData };
    selectedCell: string | null;
    selectedRange: string[];
    columnWidths: { [key: string]: number };
    rowHeights: { [key: string]: number };
  }