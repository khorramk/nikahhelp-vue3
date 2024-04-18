<template>
    <div class="d-none d-md-block">
        <AcceptDecline />
        <!-- <SuggestionCandidate class="mt-5"/> -->
    </div>
</template>

<script>
import AcceptDecline from '@/components/atom/AcceptDecline.vue'
// import SuggestionCandidate from '@/components/search/SuggestionCandidate'
export default {
    name: 'ProfileDetailRight',
    components: {
        AcceptDecline,
        // SuggestionCandidate
    }
}
</script>
