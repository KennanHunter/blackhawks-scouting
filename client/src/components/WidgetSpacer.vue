<template>
    <div
        :style="{
            width: unitsString(data.width),
            height: unitsString(data.height),
        }"
    ></div>
</template>

<script setup lang="ts">
import { WidgetData }from "@scout/shared";

defineProps<{
    data: WidgetData;
    currentId: string;
}>();

const unitsString = (n: number | undefined) => n?.toString().concat("px");
</script>
