<template>
    <div class="top-toolbar">
        <button @click="state.sidebarWidth = 50">Toggle Sidebar</button>
        <!-- Add more toolbar content here -->
    </div>
</template>

<script setup>
defineProps(['toggleSidebar']);
import { state } from '../store';
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