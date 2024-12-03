import mutations from "./mutations.js";

export default {
    state() {
        return {
            webSocket: null,
        };
    },
    mutations,
};
