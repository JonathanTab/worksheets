<template>
    <pre>{{ rendered }}</pre>
</template>
<script setup>
import { store } from '../../store';
import { computed } from 'vue';
const rendered = computed(() => {
    return JSON.stringify(store, null, 2)
});

</script>