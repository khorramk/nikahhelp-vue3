<template>
    <div class="col-md-12 mb-3">
        <div class="card-custom h-100 shadow-default">
        <h5 class="text--disabled">More about preferred partner</h5>
        <p class="text--disabled">How Important following characters are to me</p>
        <hr />
        <!-- Character -->
        <rating-component
            title="Strength of character from a moral point of view"
            :value="
            candidateData.preference.pre_strength_of_character_rate
            "
            :valueString="
            candidateData.preference
                .pre_strength_of_character_rate_string
            "
        ></rating-component>
        <!-- Looks and Apperance -->
        <rating-component
            title="Looks and apperance"
            :value="candidateData.preference.pre_look_and_appearance_rate"
            :valueString="
            candidateData.preference.pre_look_and_appearance_rate_string
            "
        ></rating-component>
        <!-- Religiosity/Faith -->
        <rating-component
            title="Religiosity/ Faith"
            :value="
            candidateData.preference.pre_religiosity_or_faith_rate
            "
            :valueString="
            candidateData.preference
                .pre_religiosity_or_faith_rate_string
            "
        ></rating-component>
        <!-- Manners, Social skills and ethics -->
        <rating-component
            title="Manners, Social skills and ethics"
            :value="
            candidateData.preference.pre_manners_socialskill_ethics_rate
            "
            :valueString="
            candidateData.preference
                .pre_manners_socialskill_ethics_rate_string
            "
        ></rating-component>
        <!-- Emotional Maturity and compatibility -->
        <rating-component
            title="Emotional Maturity and compatibility"
            :value="candidateData.preference.pre_emotional_maturity_rate"
            :valueString="
            candidateData.preference.pre_emotional_maturity_rate_string
            "
        ></rating-component>
        <!-- Good Listener -->
        <rating-component
            title="Good Listener"
            :value="candidateData.preference.pre_good_listener_rate"
            :valueString="
            candidateData.preference.pre_good_listener_rate_string
            "
        ></rating-component>
        <!-- Good talker -->
        <rating-component
            title="Good talker"
            :value="candidateData.preference.pre_good_talker_rate"
            :valueString="
            candidateData.preference.pre_good_talker_rate_string
            "
        ></rating-component>
        <!-- Willing to learn -->
        <rating-component
            title="Willing to learn"
            :value="candidateData.preference.pre_wiling_to_learn_rate"
            :valueString="
            candidateData.preference.pre_wiling_to_learn_rate_string
            "
        ></rating-component>
        <!-- Family or Social Status-->
        <rating-component
            title="Family or Social Status"
            :value="
            candidateData.preference.pre_family_social_status_rate
            "
            :valueString="
            candidateData.preference
                .pre_family_social_status_rate_string
            "
        ></rating-component>
        <!-- Employment or Wealth-->
        <rating-component
            title="Employment or Wealth"
            :value="candidateData.preference.pre_employment_wealth_rate"
            :valueString="
            candidateData.preference.pre_employment_wealth_rate_string
            "
        ></rating-component>
        <!-- Education -->
        <rating-component
            title="Education"
            :value="candidateData.preference.pre_education_rate"
            :valueString="
            candidateData.preference.pre_education_rate_string
            "
        ></rating-component>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RatingOnAdminPanel',
    props: {
        data: Object
    }
}
</script>
