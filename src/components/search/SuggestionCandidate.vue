<template>
    <div>
        <v-card
            width="100%"
        >
         <div class="p-3">
            <p class="text-h6 text--secondary">Suggestion Match</p>
            <carousel
                :perPageCustom="[[320, 1],[768, 1], [1280, 1]]"
                :paginationEnabled="false"
                navigationEnabled
                :navigationClickTargetSize="0"
            >
                <slide v-for="n in 5" :key="n">
                    <CandidateSuggestionCard />
                </slide>
            </carousel>
         </div>
        </v-card>
    </div>
</template>

<script>
import CandidateSuggestionCard from '@/components/search/CandidateSuggestionCard'
import { Carousel, Slide } from 'vue-carousel';
export default {
    name: 'SuggestionCandidate',
    components: {
        CandidateSuggestionCard,
        Carousel,
		Slide,
    }
}
</script>
