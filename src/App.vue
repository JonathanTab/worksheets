<template>
    <div id="app">
        <TopToolbar />
        <div class="main-container">
            <WorksheetsApp> </WorksheetsApp>
            <Sidebar v-show="!state.sidebarHidden" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WorksheetsApp from './components/WorksheetsApp.vue'
import TopToolbar from './components/chrome/TopToolbar.vue';

import Sidebar from './components/chrome/sidebar.vue';
import { state } from './store';


</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.main-container {
    flex: 1;
    display: flex;
    padding-top: 40px;
    /* Height of the top toolbar, adjust if needed */
}
</style>