<template>
    <div class="bottom-toolbar">
        <PageNavigation :pages="store.pages" :currentPageIndex="state.currentPageIndex" />
    </div>
</template>

<script setup>
import { store, state } from '../store';
import PageNavigation from './PageNavigation.vue';
</script>

<style>
.bottom-toolbar {
    padding: 10px;
    background-color: #f0f0f0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
}
</style>