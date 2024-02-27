// BlockRenderer.ts

import { Block, Cell } from '../store';

export function renderBlock(block: Block, data: Cell[][]) {
  const { startIndexY, startIndexX } = block;

  // Initialize block with empty cell objects
  const blockData: Cell[][] = [];
  for (let i = 0; i < block.grid.rows.length; i++) {
    blockData[i] = [];
    for (let j = 0; j < block.grid.columns.length; j++) {
      blockData[i][j] = {
        value: '',
        style: '',
      };
    }
  }

  // Set block cell values
  for (let i = 0; i < block.grid.rows.length; i++) {
    for (let j = 0; j < block.grid.columns.length; j++) {
      blockData[i][j] = block.grid.rows[i].cells[j];
    }
  }

  // Override the grid with block data
  for (let i = 0; i < block.grid.rows.length; i++) {
    for (let j = 0; j < block.grid.columns.length; j++) {
      const rowIndex = startIndexY + i;
      const colIndex = startIndexX + j;

      // Check if the cell is on the outer border of the block
      const isBorderCell =
        i === 0 || j === 0 || i === block.grid.rows.length - 1 || j === block.grid.columns.length - 1;

      // Set the value of the cell to 'A' if it's on the border, otherwise use the blockData value
      data[rowIndex][colIndex] = {
        value: isBorderCell ? 'A' : blockData[i][j].value,
        style: '',
      };
    }
  }
}