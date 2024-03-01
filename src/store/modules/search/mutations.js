import { getUserId } from "../../../services/jwt.service";

export default {
    setSuggestionOn: (state, payload) => state.suggested = payload,
    setProfiles: (state, payload) => state.profiles =[...state.profiles, ...payload],
    setProfileDetails: (state, payload) => state.profileDetails = payload,
    clearProfiles: (state) => state.profiles = [],
    setComponent: (state, name) => state.component = name,
    setTotalResult: (state, value) => state.totalResult = value,
    setLoading: (state, value) => state.isLoading = value,
    setSearchStatus: (state, value) => state.isSearched = value,
    setPaginationData: (state, value) => state.pagination = value,
    pushQuery: (state, value) => state.queryArr.push(value),
    setSelectedProfileInfo: (state, payload) => state.selectedProfile = payload,

    updateCandidateAfterBlock: (state, data) => {
        let candidate = state.profiles.find(i => i.user_id == data.userId);
        if(candidate) candidate.is_block_listed = data.value
    },
    updateCandidateAfterShortlisted: (state, data) => {
        let candidate = state.profiles.find(i => i.user_id == data.userId);
        if(candidate) candidate.is_short_listed = data.value
    },
    updateCandidateAfterTeamtlisted: (state, data) => {
        let candidate = state.profiles.find(i => i.user_id == data.userId);
        if(candidate) candidate.is_teamListed = data.value
    },
    updateCandidateAfterConnect: (state, data) => {
        let candidate = state.profiles.find(i => i.user_id == data.userId);
        console.log(candidate, 'mutation')
        if(candidate) {
            candidate.is_connect = data.value
            candidate.teamConnectType = 1
        }
    }
}