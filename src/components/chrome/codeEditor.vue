<template>
    <div>
        <button @click="openModal">Open Editor</button>

        <div v-show="isModalOpen" class="modalWrapper">
            <div class="modal-content">
                <JsonEditorVue v-model="jsonComputed" />
                <button @click="saveChanges">Save Changes</button>
                <button @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { store } from '../../store';
import JsonEditorVue from 'json-editor-vue'

const isModalOpen = ref(false);
var jsonComputed = ""

const openModal = () => {
    jsonComputed = JSON.parse(JSON.stringify(store));
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    console.log(jsonComputed)
};
const saveChanges = () => {
    if (typeof jsonComputed === 'string' || jsonComputed instanceof String)
        overwriteObj(store, JSON.parse(jsonComputed))
    else
        overwriteObj(store, jsonComputed)

    closeModal();

};
function overwriteObj(obj, replacement) {
    Object.keys(obj).forEach(key => {
        let replacementArray = replacement[key] || [];
        obj[key].splice(0, obj[key].length); // Clear out the array
        replacementArray.forEach(item => obj[key].push(item)); // Repopulate the array
    });
}
</script>

<style>
.modalWrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    min-width: 500px;
    width: 50vw;
    height: 60vh;
    overflow: scroll;
    background-color: white;
    padding: 20px;
}
</style>