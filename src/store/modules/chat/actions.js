// import firebase from '../../../configs/firebase';
import ApiService from "../../../services/api.service";
export default {
    async getConversations(context,user_id){
    //   var convCollection = firebase.collection('conversations');
    //   convCollection.onSnapshot(res => {
    //       const changes = res.docChanges();
    //       // var self = this;
    //       changes.forEach(change => {
    //           if(change.type === 'added'){
    //               console.log('conv_added');
    //               var data = change.doc.data();
    //               if(data.members){
    //                 for(var i=0; i< data.members.length; i++){
    //                 // console.log('conv_data',data);  
    //                 if(data.members[i] == user_id){
    //                     var docData = change.doc.data();
    //                     var docId = change.doc.id;                   
    //                     var payload = {
    //                         data: docData,
    //                         id: docId
    //                     }
    //                     context.commit("loadConversations", payload);
    //                   }
    //                 }
    //               }
                  
    //           }
    //       })
    //   });
    },
    async getMsgs(context){
        // var msgCollection = firebase.collection('messages');
        // msgCollection.orderBy('sent_at').onSnapshot(res => {
        //     const changes = res.docChanges();
        //     changes.forEach(change => {
        //         if(change.type === 'added'){
        //             console.log('msg_added');
        //             var docData = change.doc.data();
        //             var docId = change.doc.id;
        //             var payload = {
        //                 data: docData,
        //                 id: docId
        //             }
        //             context.commit("loadMsgs", payload);
        //         }
        //     })
        // });
    },
    setScrollDownStatus(context,flag){
        context.commit("setScrollDownStatus", flag);
    },
    async getUnreadRecords(context,user_id){
        // var unreacRecordCollection = firebase.collection('unread_records');
        // unreacRecordCollection.onSnapshot(res => {
        //     const changes = res.docChanges();
        //     changes.forEach(change => {
        //         if(change.type === 'added'){
        //             console.log('unread_added');
        //             var docData = change.doc.data();
        //             if(docData.user_id == user_id){
        //                 var docId = change.doc.id;
        //                 var payload = {
        //                     data: docData,
        //                     id: docId
        //                 }
        //                 context.commit("loadUnreadRecords", payload);
        //             }
                    
        //         }
        //     })
        // });
    },
    async clearUnreadMsg(context,payload){
        // let query = firebase.collection('unread_records').where('conv_id', '==', payload.conv_id).where('user_id', '==', parseInt(payload.user_id));
        // console.log("conv_id",payload.conv_id);
        // console.log("user_id",parseInt(payload.user_id));
        
        // query.get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         console.log('delete fired');
        //         doc.ref.delete();
     
        //     });
        //     context.commit("clearUnreadMsg", payload);
        // });
        // console.log(context);
    },
    setCurrentConversation(context,conversation_id){
        context.commit("setCurrentConversation", conversation_id);
    },
    async getConwiseInfo(context){
        const response = await ApiService.post("v1/chat-info")
        .then((res) => {
            console.log(res.data.data);
            context.commit('setConwiseInfo',res.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
        console.log("response", response);
    },
    async getChatUserInfo(context){
        const response = await ApiService.post("v1/chat-user-info")
        .then((res) => {
            console.log(res.data.data);
            context.commit('setChatUserInfo',res.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
        console.log("response", response);
    } 
}