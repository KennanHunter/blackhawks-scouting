<template>
    <ErrorList :errors="errors" />
    <RouterView />
</template>

<script setup lang="ts">
import ErrorList from "@/components/ErrorList.vue";
import { onErrorCaptured } from "vue";

const errors = $ref(new Array<string>());

// Set handler to capture errors and push them to an array
onErrorCaptured((e) => {
    errors.push(`${e.name}: ${e.message}`);
    return false;
});
</script>

<style>
:root {
    --text-color: #ddd;
    --bg-color: #292929;
    --button-color: #3e3e3e;
    --input-color: #1c1c1c;
}

.egg {
    --text-color: #1c1c1c;
    background-image: url("https://eggfrid.ge/img/fridge-0.jpg");
    background-position: center;
    background-repeat: stretch;
}

* {
    color: var(--text-color);
    box-sizing: border-box;
}

img {
    display: block;
    user-select: none;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: var(--bg-color);
    margin: 0;
}

button {
    background-color: var(--button-color);
    user-select: none;
    cursor: pointer;
}

input,
select,
textarea {
    background-color: var(--input-color);
}

button,
input,
select,
textarea {
    font-size: 100%;
    border: none;
}

table {
    border-collapse: collapse;
}

td,
th {
    border: 1px solid var(--text-color);
    padding: 2px;
}
</style>
