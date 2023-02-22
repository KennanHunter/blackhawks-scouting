<template>
    <div id="inspector-container">
        <RemoteInspectorContainer />
    </div>
</template>

<script setup lang="ts">
import RemoteInspectorContainer from "@/components/RemoteInspectorContainer.vue";
</script>

<style>
#inspector-container {
    display: grid;
    height: 100vh;
    gap: 20px;
    grid-template-rows: auto 1fr;
}
</style>
