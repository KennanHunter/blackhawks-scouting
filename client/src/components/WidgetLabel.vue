<template>{{ data.name }}</template>

<script setup lang="ts">
import { WidgetData } from "shared";

defineProps<{
    data: WidgetData;
    currentId: string;
}>();
</script>
