<template>
    <div class="sidebar" :style="{ width: state.sidebarWidth + 'px' }">
        <div class="resize-handle" @mousedown="initResize"></div>
        <!-- Sidebar content goes here -->
        <p>Sidebar content goes here.</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { store, state, Page } from '../../store';

let startX = ref(0);
let startWidth = ref(0);

const initResize = (e) => {
    // Prevent text selection and other default behaviors while dragging
    e.preventDefault();
    // Record the starting X position and the starting sidebar width
    startX.value = e.clientX;
    startWidth.value = state.sidebarWidth;
    // Attach the event listeners to the document to handle drag movement
    document.addEventListener('mousemove', doResize, { passive: false });
    document.addEventListener('mouseup', stopResize, { passive: false });
};

const doResize = (e) => {
    // Prevent default behavior during drag to avoid potential performance issues
    // e.preventDefault();
    // Calculate the new width based on the mouse movement
    const currentWidth = startWidth.value - (e.clientX - startX.value);
    // Update the sidebar width in real-time
};

const stopResize = (e) => {
    // Remove the event listeners once dragging is complete
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
};
</script>

<style>
.sidebar {
    background-color: #e0e0e0;
    position: fixed;
    top: 40px;
    /* Height of the top toolbar */
    right: 0;
    bottom: 0;
    overflow-y: auto;
    transition: width 0.3s;
    z-index: 50;
}

.is-collapsed {
    width: 0 !important;
    /* override width when collapsed */
    overflow: hidden;
}

.resize-handle {
    position: absolute;
    left: 0;
    /* The handle is on the left side */
    top: 0;
    bottom: 0;
    width: 10px;
    /* Width of the handle for easier dragging */
    cursor: ew-resize;
    background-color: #ccc;
    z-index: 10;
    /* Ensure the handle is above other elements */
}
</style>
