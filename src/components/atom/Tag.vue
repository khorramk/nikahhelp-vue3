<template>
    <div>
        <v-chip
            color="indigo lighten-4"
            text-color="white"
            class="ma-2 indigo lighten-4"
            small
            close
        >
            {{text}}
        </v-chip>
    </div>
</template>

<script>
export default {
    name: 'Tag',
    props: {
        text: {
            type: String
        }
    }
}
</script>
