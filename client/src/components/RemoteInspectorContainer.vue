<template>
    <div id="controls-container">
        <h4 class="notice">Note: Remote Data (Last fetched {{}})</h4>
        <RouterLink :to="{ name: 'home' }" style="margin-right: 40px"
            >Home</RouterLink
        >
        <button @click="deleteData">Delete</button>
        <a href="https://api.scout.kennan.tech/get" download>
            <button>Download</button>
        </a>
        <button @click="clearData">Clear All</button>
    </div>
    <div class="table-container">
        <span v-if="savedData === undefined">No Data</span>
        <InspectorTable v-else v-model="selectedRecords" :data="savedData" />
    </div>
</template>

<script setup lang="ts">
import { SavedData } from "@/common/stores";
import { CSV } from "@/util/csv";
import { onMounted } from "vue";
import InspectorTable from "./InspectorTable.vue";

let savedData = $ref<SavedData>();

onMounted(async () => {
    const res = await fetch(import.meta.env.VITE_API_URI + "/get").then((val) =>
        val.text()
    );

    savedData = CSV.deserialize(res);

    console.dir({ savedData });
});

const selectedRecords = $ref(new Set<number>());

function deleteData() {
    if (!confirm(`Delete all records permanently?`)) return;

    selectedRecords.clear();
}

function clearData() {
    if (!confirm("Clear all saved entries in local storage permanently?"))
        return;

    savedData = undefined;
}
</script>

<style>
.notice {
    background-color: orangered;
}

.table-container {
    overflow: auto;
}

#controls-container > * {
    margin: 4px;
}
</style>
