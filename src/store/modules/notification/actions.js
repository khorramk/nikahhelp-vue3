import ApiService from "../../../services/api.service";

export default {
    async loadNotifications(context, _) {
        return new Promise((resolve, reject) => {
            ApiService.get("v1/list-notification")
                .then((data) => {
                    // console.log(data.data);
                    //context.commit('setUserTeamList', data.data.data);
                    resolve(data.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    async storeNotifications(context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post("v1/send-notification", payload)
                .then((data) => {
                    console.log(data.data);
                    resolve(data.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};
