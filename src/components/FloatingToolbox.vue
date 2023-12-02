<template>
    <div class="floating-toolbox">
        <div class="header">
            <span class="title">Toolbox</span>
            <button class="close-btn" @click="closeToolbox">X</button>
        </div>
        <div class="tabs">
            <button v-for="(page, index) in pages" :key="index" :class="{ active: activePageIndex === index }"
                @click="setActivePage(index)">
                {{ page.title }}
            </button>
        </div>
        <div class="content">
            <div v-for="(section, index) in activePage.sections" :key="index" class="section">
                <div class="section-title">{{ section.title }}</div>
                <div class="buttons">
                    <button v-for="(button, index) in section.buttons" :key="index">
                        {{ button.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activePageIndex = ref(0);
const pages = ref([
    {
        title: 'Page 1',
        sections: [
            { title: 'Menu 1', buttons: generateRandomButtons() },
            { title: 'Menu 2', buttons: generateRandomButtons() },
            { title: 'Menu 3', buttons: generateRandomButtons() },
        ],
    },
    {
        title: 'Page 2',
        sections: [
            { title: 'Menu 1', buttons: generateRandomButtons() },
            { title: 'Menu 2', buttons: generateRandomButtons() },
            { title: 'Menu 3', buttons: generateRandomButtons() },
        ],
    },
]);

const activePage = computed(() => pages.value[activePageIndex.value]);

function generateRandomButtons() {
    return Array.from({ length: 4 }, () => ({
        label: Math.random().toString(36).substring(7),
    }));
}

function setActivePage(index) {
    activePageIndex.value = index;
}

function closeToolbox() {
    // Logic to close the toolbox
}
</script>

<style scoped>
.floating-toolbox {
    position: fixed;
    top: 50px;
    right: 50px;
    width: 300px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
}

.title {
    font-weight: bold;
}

.close-btn {
    border: none;
    background: none;
    cursor: pointer;
}

.tabs button {
    padding: 10px;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
}

.tabs .active {
    border-bottom: 2px solid #333;
}

.content {
    padding: 10px;
}

.section {
    margin-bottom: 20px;
}

.section-title {
    font-size: 1.1em;
    margin-bottom: 10px;
}

.buttons button {
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    background-color: #e9e9e9;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
}

.buttons button:hover {
    background-color: #d1d1d1;
}
</style>
