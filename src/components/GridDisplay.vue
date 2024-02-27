<template>
    <div style="overflow-x: auto">
        <table v-on-click-outside="clearSelection" @selectstart.prevent v-if="store.pages.length > 0">

            <colgroup>
                <col v-for="(col) in data.columns" span="1" :style="{ width: col.width }">
            </colgroup>
            <tbody>
                <tr v-for="(row, rowIndex) in data.rows " :key="rowIndex">
                    <GridCell v-for="(gridCell, colIndex) in row" :key="colIndex"
                        @click.native="handleCellSelection(colIndex, rowIndex)" :selected="isSelected(colIndex, rowIndex)"
                        :cell="gridCell" />
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <FloatingToolbox></FloatingToolbox> -->
</template>

<script setup lang="ts">
import { ComputedRef, computed, reactive, ref, watch } from 'vue';
import { store, state, Column, Page, Row, Cell, Grid } from '../store';
import GridCell from './GridCell.vue';
import { vOnClickOutside } from '@vueuse/components'
import { onKeyStroke } from '@vueuse/core'

const props = defineProps<{ data: Grid }>()

const isSelected = (x, y) => {
    return state.selection.x === x && state.selection.y === y;
};
const clearSelection = () => {
    state.selection = { x: null, y: null }
}

const handleCellSelection = (colIndex, rowIndex) => {
    state.selection = { x: colIndex, y: rowIndex }
};


onKeyStroke(['ArrowDown'], (e) => {
    handleArrowKeys(e)
})
onKeyStroke(['ArrowUp'], (e) => {
    handleArrowKeys(e)
})
onKeyStroke(['ArrowLeft'], (e) => {
    handleArrowKeys(e)
})
onKeyStroke(['ArrowRight'], (e) => {
    handleArrowKeys(e)
})
function handleArrowKeys(event) {
    const { x, y } = state.selection;
    if (state.editing > 0) {
        return;
    }
    else {
        event.preventDefault()
    }
    if (event.key === "ArrowUp") {
        state.selection = { x, y: y - 1 };
    } else if (event.key === "ArrowDown") {
        state.selection = { x, y: y + 1 };
    } else if (event.key === "ArrowLeft") {
        state.selection = { x: x - 1, y };
    } else if (event.key === "ArrowRight") {
        state.selection = { x: x + 1, y };
    }

    if (state.selection.y < 0) {
        state.selection.y = 0;
    } else if (state.selection.y >= props.data.rows.length) {
        state.selection.y = props.data.rows.length - 1
    }


    if (state.selection.x < 0) {
        state.selection.x = 0;
    } else if (state.selection.x >= props.data.columns.length) {
        state.selection.x = props.data.columns.length - 1
    }
}

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