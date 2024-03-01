export default {
    getProfiles: state => state.profiles,
    getProfileDetails: state => state.profileDetails,
    getProfileCount: state => state.profiles.length,
    getTotalResult: state => state.totalResult,
    getLoadingStatus: state => state.isLoading,
    getSearchStatus: state => state.isSearched,
    getPagination: state => state.pagination,
    getQueryArr: state => state.queryArr,
    getComponentName: state => state.component,
    getSelectedProfileInfo: state => state.selectedProfile,
    getSugesstedFlag: state => state.suggested,
};
