<template>{{ data.name }}</template>

<script setup lang="ts">
import { WidgetData }from "@scout/shared";

defineProps<{
    data: WidgetData;
    currentId: string;
}>();
</script>
