<template>
    <button @click="setValue(value - 1)">-</button>
    <input
        type="number"
        class="spinbox"
        v-model="value"
        :id="currentId"
        :min="min"
        :max="max"
        step="1"
        :readonly="!data.allowKeyboardInput"
        @change="setValue(value)"
    />
    <button @click="setValue(value + 1)">+</button>
</template>

<script setup lang="ts">
import { clamp, inRange } from "lodash";
import { useWidgetsStore } from "@/common/stores";
import { WidgetData }from "@scout/shared";

const props = defineProps<{
    data: WidgetData;
    currentId: string;
}>();

const min = props.data.min ?? 0;
const max = props.data.max ?? Number.MAX_SAFE_INTEGER;

let value = $ref(min);
defineExpose({
    index: useWidgetsStore().addWidgetValue(props.data, $$(value)),
});

// Updates the value of the widget.
const setValue = (newValue: number) =>
    (value = inRange(newValue, min, max)
        ? newValue
        : clamp(newValue, min, max));
</script>

<style lang="postcss">
.spinbox {
    text-align: center;
    width: 4em;
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
}
</style>
