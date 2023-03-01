<template>
    <div id="home-container">
        <h1>Upload CSVs</h1>

        <input
            type="file"
            @change="onFileChanged($event)"
            accept="text/csv"
            capture
        />

        <button @click="upload">Upload</button>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { z } from "zod";

const uploadSchema = () =>
    z.object({
        csvs: z.string().array(),
    });

export default {
    name: "FileUpload",

    setup() {
        const files = ref<FileList | null>();
        const form = ref<HTMLFormElement>();

        function onFileChanged($event: Event) {
            const target = $event.target as HTMLInputElement;
            if (target && target.files) {
                files.value = target.files;
            }
        }

        async function upload() {
            if (files.value) {
                try {
                    let fileCsvs: string[] = [];

                    for (const file of files.value) {
                        fileCsvs.push(await file.text());
                    }

                    const body = JSON.stringify(
                        uploadSchema().parse({
                            csvs: fileCsvs,
                        })
                    );

                    console.log(body);
                    fetch(
                        new URL(
                            import.meta.env.VITE_API_URI + "/upload"
                        ).toString(),
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body,
                        }
                    ).then((val) => {
                        console.dir({ val });
                    });
                } catch (error) {
                    console.error(error);
                    form.value?.reset();
                    files.value = null;
                }
            }
        }

        return {
            upload,
            onFileChanged,
        };
    },
};
</script>

<style scoped>
#home-container {
    display: grid;
    justify-content: center;
}

input {
    width: 30em;
    height: 3em;
    margin: 1em;
}
</style>
