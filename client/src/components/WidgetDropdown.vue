<template>
    <select :id="currentId" v-model="value">
        <option v-if="data.defaultOption" :value="-1" selected disabled>
            Select...
        </option>
        <option
            v-for="[i, value] of data.options?.entries()"
            :value="i"
            :key="i"
        >
            {{ value }}
        </option>
    </select>
</template>

<script setup lang="ts">
import { useWidgetsStore } from "@/common/stores";
import { WidgetData }from "@scout/shared";

const props = defineProps<{
    data: WidgetData;
    currentId: string;
}>();

const value = $ref(props.data.defaultOption ? -1 : 0);
defineExpose({
    index: useWidgetsStore().addWidgetValue(props.data, $$(value)),
});
</script>
