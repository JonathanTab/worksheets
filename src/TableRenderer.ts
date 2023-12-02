// TableRenderer.ts
import { Table, Cell } from './store';

export function renderTable(table: Table, data: Cell[][]) {
  const { startIndexY, startIndexX, grid: tableGrid } = table;

  // Initialize table with empty cell objects
  const tableData: Cell[][] = [];
  for (let i = 0; i < tableGrid.rows.length; i++) {
    tableData[i] = [];
    for (let j = 0; j < tableGrid.columns.length; j++) {
      tableData[i][j] = {
        value: '',
        style: '',
      };
    }
  }

  // Set table cell values
  for (let i = 0; i < tableGrid.rows.length; i++) {
    for (let j = 0; j < tableGrid.columns.length; j++) {
      tableData[i][j] = tableGrid.rows[i].cells[j];
    }
  }

  // Override the grid with table data
  for (let i = 0; i < tableGrid.rows.length; i++) {
    for (let j = 0; j < tableGrid.columns.length; j++) {
      const rowIndex = startIndexY + i;
      const colIndex = startIndexX + j;
      data[rowIndex][colIndex] = tableData[i][j];
    }
  }
}