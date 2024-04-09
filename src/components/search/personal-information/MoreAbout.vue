<template>
    <v-card style="height: 100%" class="p-3">
        <p class="text-h6 text--secondary">More about me</p>
        <div>
            <FieldsetCard
                class="mt-3"
                title="Marital Status"
                :info="personal.per_marital_status"
            />
            <FieldsetCard
                class="mt-3"
                title="Currently Living with"
                :info="personal.per_currently_living_with"
            />
            <FieldsetCard
                class="mt-3"
                title="Willing to Relocate"
                :info="personal.per_willing_to_relocate == 1 ? 'Yes' : 'No'"
            />
            <FieldsetCard
                class="mt-3"
                title="Smoker"
                :info="personal.per_smoker == 1 ? 'Yes' : 'No'"
            />
            <FieldsetCard
                class="mt-3"
                title="Language(s) I Speak"
                :info="personal.per_language_speak"
            />
            <FieldsetCard
                class="mt-3"
                title="My Hobbies & Interest"
                :info="personal.per_hobbies_interests"
            />
            <FieldsetCard
                class="mt-3"
                title="Foods I Like"
                :info="personal.per_food_cuisine_like"
            />
            <FieldsetCard
                class="mt-3"
                title="Things I Enjoy"
                :info="personal.per_things_enjoy"
            />
            <!-- <FieldsetCard
                class="mt-3"
                title="I'm Thankfull for"
                :info="personal.per_thankfull_for"
            />
            <FieldsetCard
                class="mt-3"
                title="I improve myself"
                info=""
            /> -->
        </div>
    </v-card>
</template>

<script>
import FieldsetCard from '@/components/atom/FieldsetCard.vue'
export default {
    name:'MoreAbout',
    components: {
        FieldsetCard
    },
    props: {
        data: {
            type: Object
        }
    },
    computed: {
        personal() {
            return this.data?.personal ? this.data.personal : {}
        }
    }
}
</script>
