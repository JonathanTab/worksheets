<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                        <input v-model="cell.value" />
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="addRow">Add Row</button>
        <button @click="addColumn">Add Column</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { enableVueBindings } from '@syncedstore/core';
import * as Vue from "vue";
import store, { Row } from '../store';

// Enable Vue bindings for the SyncedStore store
enableVueBindings(Vue);

const headers = ref(['A', 'B', 'C']); // Initial column headers
const rows = store.rows; // Reactive rows from the store

const addRow = () => {
    const newRow: Row = headers.value.map(() => ({ value: '' }));
    rows.push(newRow);
};

const addColumn = () => {
    const newHeader = String.fromCharCode(65 + headers.value.length);
    headers.value.push(newHeader);
    rows.forEach(row => {
        row.push({ value: '' });
    });
};
</script>

<style>
/* Your styles here */
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

input {
    border: none;
    background-color: transparent;
    width: 100%;
}
</style>