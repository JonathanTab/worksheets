<template>
    <td v-on:dblclick="startEditing" :style="[defaultStyle, cell.style]" :class="{ 'selected': selected }">
        <input ref="input" v-on-click-outside="stopEditing" v-if="editing" v-model="cell.value" @input="handleInput" />
        <span v-else>{{ cell.rendered }}</span>
    </td>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { vOnClickOutside } from '@vueuse/components'
import { useFocus } from '@vueuse/core'
import { state } from '../store';

const input = ref()
const props = defineProps({
    cell: Object,
    selected: Boolean,
    rowIndex: Number,
    cellIndex: Number,
});
const editing = ref(false);

const emits = defineEmits(['update-cell']);



function startEditing() {
    if (editing.value === false) {
        state.editing++
        editing.value = true
        useFocus(input, { initialValue: true })
    }
}
function stopEditing() {
    if (editing.value === true) {
        editing.value = false
        state.editing--;
    }
}


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
.selected {
    border: 2px dashed yellow !important;

}

input {
    background-color: white;
    color: black;
    font: default;
    width: 100%;
    padding: 0;
    /* Consider removing padding to ensure border styles are visible */
    border: none;
    /* Remove default borders from input to defer to cell's borders */
    box-sizing: border-box;
}
</style>