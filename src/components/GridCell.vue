<template>
    <td :style="defaultStyle, cell.style">
        <input v-model="cell.value" @input="handleInput" />
    </td>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    cell: Object,
    rowIndex: Number,
    cellIndex: Number,
});

const emits = defineEmits(['update-cell']);

const defaultStyle = ref({
    backgroundColor: 'white',
    color: 'green',
    textWeight: 'normal',
});

const cellStyle = computed(() => {
    const merged = { ...styleConfig, ...props.cell.styles };

    // Transform borders object into proper CSS border styles
    if (merged.borders) {
        const borderStyles = Object.entries(merged.borders)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');
        merged.borders = borderStyles;
    }

    const cssStyles = Object.entries(merged)
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');

    return cssStyles;

});

const handleInput = (event) => {
    emits('update-cell', {
        rowIndex: props.rowIndex,
        cellIndex: props.cellIndex,
        value: event.target.value,
    });
};
</script>

<style>
input {
    width: 100%;
    padding: 0;
    /* Consider removing padding to ensure border styles are visible */
    border: none;
    /* Remove default borders from input to defer to cell's borders */
    box-sizing: border-box;
}
</style>