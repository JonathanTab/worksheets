<template>
    <div style="overflow-x: auto">
        <button @click="addColumn">Add Column</button>
        <button @click="initStore" :hidden="store.pages.length > 5">Initialize</button>
        <table>
            <tbody>
                <tr v-for="(row, rowIndex) in rendered" :key="rowIndex">
                    <td v-for="(gridCell, colIndex) in row" :key="colIndex">
                        <GridCell :cell="gridCell" @input="updateCellValue(gridCell, rowIndex, colIndex)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <FloatingToolbox></FloatingToolbox> -->
</template>

<script setup lang="ts">
import { ComputedRef, computed, reactive, ref } from 'vue';
import { store, state, Column, Page, Row, Cell, Grid, Table } from '../store';
import { renderTable } from '../TableRenderer';
import { renderBlock } from '../BlockRenderer'
import GridCell from './GridCell.vue';
import FloatingToolbox from './FloatingToolbox.vue';

const currentPageData: ComputedRef<Page> = computed(() => {
    if (store.pages.length > 0) {
        return store.pages[state.currentPageIndex]
    } else { return [] }
});


const rendered = computed(() => {
    const data: Cell[][] = [];

    if (currentPageData.value.blocks) {
        const { grid, tables, blocks } = currentPageData.value;

        // Copy the cells from pageData.grid into gridData
        grid.rows.forEach((row, rowIndex) => {
            data[rowIndex] = [];
            row.cells.forEach((cell, colIndex) => {
                data[rowIndex][colIndex] = cell;
            });
        });

        // Render tables
        tables.forEach((table) => {
            renderTable(table, data);
        });

        // Render blocks
        blocks.forEach((block) => {
            renderBlock(block, data);
        });
    }

    console.dir(data)

    return data;
});

const initStore = () => {

    // Define the columns
    const columns: Column[] = [
        { name: "Column 1", width: "100px" },
        { name: "Column 2", width: "100px" },
    ];
    const rows: Row[] = [{ cells: [{ value: 'yo', style: { backgroundColor: "green" } }, { value: 'trt', style: {} }] }, { cells: [{ value: '', style: {} }, { value: 'ok', style: {} }] }];
    const grid: Grid = {
        columns,
        rows,
    }

    let page: Page = {
        name: "new",
        grid: grid,
        tables: [],
        blocks: []

    }

    // If you need to add this page to the store, you would do something like this:
    store.pages.push(page);
}
const addColumn = () => {
    const columnName = `Column ${currentPage.value.columns.length + 1}`;
    currentPage.value.columns.push({
        name: columnName, width: '100px'
    });
    currentPage.value.rows.forEach(row => {
        row.push({ value: '', formatting: {} });
    });
};

const removeColumn = (columnIndex) => {
    currentPage.value.columns.splice(columnIndex, 1);
    currentPage.value.rows.forEach(row => {
        row.splice(columnIndex, 1);
    });
};

const updateCell = ({ rowIndex, cellIndex, value }) => {
    currentPage.rows[rowIndex][cellIndex].value = value;
};

</script>

<style>
table {

    border-collapse: collapse;
}

/* Add styles for the resize handle */
.resize-handle {
    display: inline-block;
    width: 10px;
    height: 100%;
    cursor: col-resize;
    position: absolute;
    right: 0;
    top: 0;
}

th {
    position: relative;
    /* Needed for absolute positioning of resize handle */
}

th,
td {
    border: 1px solid #ccc;
    text-align: left;
}

button {
    margin-left: 8px;
}
</style>