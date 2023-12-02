<template>
    <div id="app">
        <TopToolbar />
        <div class="main-container">
            <Grid :style="{ marginRight: state.sidebarWidth + 'px' }"> </Grid>
            <Sidebar v-show="!state.sidebarHidden" />
        </div>
        <BottomToolbar />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Grid from './components/Grid.vue'
import TopToolbar from './components/TopToolbar.vue';
import BottomToolbar from './components/BottomToolbar.vue';
import Sidebar from './components/Sidebar.vue';
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