import ApiService from "@/services/api.service";
export default {
    storeNotification: function (payload) {
        if(payload && payload.sender && payload.receivers && payload.receivers.length > 0) {
            let loggedUser = JSON.parse(localStorage.getItem('user'));
            payload.sender = loggedUser.id;
        }
        // let payload = {
        //   sender: loggedUser.id,
        //   receiver: 80,
        //   receivers: ['80'],
        //   team_id: 2,
        //   seen: 0,
        //   title: 'Team notification',
        //   created_at: new Date(),
        // }
        // this.$socket.emit('notification', payload);
        payload.receivers.forEach(receiver => {
            payload.receiver = receiver;
            ApiService.post("v1/send-notification", payload)
                .then((data) => {
                    console.log(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        return payload;
    },

    storeAdminNotification: function (payload) {
        if(payload && payload.sender && payload.receivers && payload.receivers.length > 0) {
            let loggedUser = JSON.parse(localStorage.getItem('user'));
            payload.sender = loggedUser.id;
        }
        ApiService.post("v1/admin/send-notification", payload)
            .then((data) => {
                console.log(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
        return payload;
    }
}