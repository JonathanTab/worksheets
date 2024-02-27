<template>
    <div class="navigation-container">
        <ul class="page-navigation">
            <li v-for="(page, index) in store.pages" :key="`page-${index}`"
                :class="{ active: index === state.currentPageId }" @click="selectPage(index)"
                @dblclick="enableEditing(index)">
                <template v-if="editingIndex === index">
                    <input v-model="editingName" @blur="savePageName(index)" @keyup.enter="savePageName(index)"
                        @keyup.esc="cancelEditing" ref="editInput" autofocus class="edit-input" />
                </template>
                <template v-else>
                    {{ page.name }}
                </template>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { store, state, Page } from '../../store';

const props = defineProps({
    pages: Array as PropType<Page[]>,
    currentPageIndex: Number
});


const editingIndex = ref(-1);
const editingName = ref('');

const selectPage = (pageIndex) => {
    if (editingIndex.value === -1) {
        state.currentPageId = pageIndex
    }
};

const enableEditing = (index) => {
    editingIndex.value = index;
    editingName.value = store.pages[index].name;
};


const savePageName = (index) => {
    if (editingName.value.trim() !== '') {
        store.pages[index].name = editingName.value;
    }
    editingIndex.value = -1;
};

const cancelEditing = () => {
    editingIndex.value = -1;
};
</script>

<style>
.navigation-container {
    border: 1px solid #cccccc;
    border-radius: 4px;
    overflow: hidden;
}

.page-navigation {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
}

.page-navigation li {
    cursor: pointer;
    padding: 8px 16px;
    border-right: 1px solid #cccccc;
}

.page-navigation li:last-child {
    border-right: none;
}

.page-navigation li.active {
    background-color: #eeeeee;
}

.page-navigation li:hover {
    background-color: #f7f7f7;
}

.edit-input {
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin: 0;
}

.edit-input:focus {
    outline: 2px solid blue;
}
</style>