<template>
    <div style="overflow-x: auto">
    </div>
    <GridDisplay :data="rendered" />
    <!-- <FloatingToolbox></FloatingToolbox> -->
    <BottomToolbar />
</template>

<script setup lang="ts">
import { ComputedRef, computed, reactive, ref, watch, watchEffect } from 'vue';
import { store, state, Column, Page, Row, Cell, Grid } from '../store';
import GridDisplay from './GridDisplay.vue';
import { SheetRenderer } from '../renderers/SheetRenderer';
import BottomToolbar from './chrome/BottomToolbar.vue';

const sheetRenderer = new SheetRenderer(store)
sheetRenderer.setPage(state.currentPageId);

//watch for future changes
watchEffect(() => {
    sheetRenderer.setPage(state.currentPageId)
})

const rendered: ComputedRef<Grid> = computed(() => {
    return sheetRenderer.render()
});

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