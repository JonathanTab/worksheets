<template>
    <div class="top-toolbar">
        {{ state.selection }}
        <button @click="">Toggle Sidebar</button>
        <button @click="initStore()">Init Store</button>
        <CodeEditor></CodeEditor>
        <!-- Add more toolbar content here -->
    </div>
</template>

<script setup lang="ts">
defineProps(['toggleSidebar']);
import { store, state, Column, Page, Row, Cell, Grid, Table } from '../../store';
import CodeEditor from './codeEditor.vue';

const initStore = () => {

    // Define the columns
    const columns: Column[] = [
        { name: "Column 1", width: "100px" },
        { name: "Column 2", width: "100px" },
    ];
    const rows: Row[] = [{
        cells: [{
            value: 'ok',
            style: {}
        }, {
            value: 'nok',
            style: {}
        }]
    },
    {
        cells: [{
            value: 'ok',
            style: {}
        }, {
            value: 'nok',
            style: {}
        }]
    },
    {
        cells: [{
            value: 'ok',
            style: {}
        }, {
            value: 'nok',
            style: {}
        }]
    },

    ];
    rows.push(rows[1]);
    const grid: Grid = {
        columns,
        rows,
    }

    let page: Page = {
        name: "new",
        grid: grid,
        tables: [], blocks: []

    }

    // If you need to add this page to the store, you would do something like this:
    store.pages.push(page)
}
</script>

<style>
.top-toolbar {
    padding: 10px;
    background-color: #f0f0f0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
}
</style>