import { Cell, Column, Grid, Row, state } from '../store.ts'
import runFormula from '../formula.ts'
import { ref } from 'vue';
export class SheetRenderer {
    store: any;
    sheetId: any = ref(0);

    constructor(givenStore) {
        this.store = givenStore;
    }
    render() {

        //Init output var
        const output: Grid = { columns: [], rows: [] };

        if (this.store.pages[this.sheetId.value]) {
            //Grab data from store
            var grid = this.store.pages[this.sheetId.value].grid;
            var tables = this.store.pages[this.sheetId.value].tables.value;
            var blocks = this.store.pages[this.sheetId.value].blocks.value;

            // Copy the columns array
            grid.columns.forEach((column: Column, colIndex) => {
                output.columns[colIndex] = column;
            });

            // Copy the cells from pageData.grid into gridData
            grid.rows.forEach((row: Row, rowIndex) => {
                output.rows[rowIndex] = [];
                row.cells.forEach((cell: Cell, colIndex) => {
                    output.rows[rowIndex][colIndex] = JSON.parse(JSON.stringify(cell));
                    output.rows[rowIndex][colIndex].rendered = runFormula(cell.value)
                });
            });



            // Render blocks
            //blocks.forEach((block) => {
            //    renderBlock(block, data);
            //});
        }

        return output;
    }
    setPage(sheetId) {
        this.sheetId.value = sheetId
        //TODO reset all state management
    }
}