<template>
    <div id="controls-container">
        <h4 class="notice">Note: Remote Data (Last fetched {{}})</h4>
        <RouterLink :to="{ name: 'home' }" style="margin-right: 40px"
            >Home</RouterLink
        >
        <template>
            <button @click="deleteData">Delete</button>
            <button @click="downloadData">Download</button>
            <button @click="clearData">Clear All</button>
        </template>
    </div>
    <div class="table-container">
        <span v-if="selectedEntry === undefined">No Data</span>
        <InspectorTable
            v-else
            v-model="selectedRecords"
            :data="selectedEntry"
        />
    </div>
    <a :hidden="true" :download="entries[selectedIdx]" ref="downloadLink"></a>
</template>

<script setup lang="ts">
import { SavedData } from "@/common/stores";
import { onMounted } from "vue";
import InspectorTable from "./InspectorTable.vue";

let savedData = $ref<SavedData>();

onMounted(async () => {
    const res = await fetch(import.meta.env.VITE_API_URI + "/get").then((val) =>
        val.text()
    );

    savedData = {
        header: res.split("\n")[0].split('"'),
        values: res
            .split("\n")
            .map((val) => val.split(","))
            .slice(1),
    } as SavedData;
});

let selectedIdx = $ref(0); // The index of the entry selected in the combobox

const downloadLink = $ref<HTMLAnchorElement>();
const selectedRecords = $ref(new Set<number>());
const hasSelectedRecords = $computed(() => selectedRecords.size > 0);

function deleteData() {
    if (!confirm(`Delete all records permanently?`)) return;

    selectedRecords.clear();
}

function downloadData() {
    if (selectedEntry == undefined) return;
    if (!downloadLink) return;

    // Generate the download link for the selected records, then trigger the download
    // If there are no records selected, they will all be included in the generated file
    downloadLink.href = widgets.makeDownloadLink({
        header: selectedEntry.header,
        values: filterRecords(true),
    });
    downloadLink.click();
}

function clearData() {
    if (!confirm("Clear all saved entries in local storage permanently?"))
        return;

    savedData?.clear();
    selectedIdx = 0; // Reset selected index
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
