export default {
    loadConversations(state, payload){
        var notfound = true;
        for(var i=0; i<state.conversations.length; i++){
            if(state.conversations[i].id ==  payload.id){
                notfound = false;
            }
        }
        if(notfound){
            state.conversations.push({
                ...payload.data,
                id: payload.id
            })
            
        }
        localStorage.setItem("chat_conversations", JSON.stringify(state.conversations));
        console.log('conversations set in local storage');
    },
    loadMsgs(state,payload){
        console.log("msg found");
        var notfound = true;
        for(var i=0; i<state.messages.length; i++){
            if(state.messages[i].id ==  payload.id){
                notfound = false;
            }
        }

        if(notfound){
            state.messages.unshift({
                ...payload.data,
                id: payload.id
            });
            // console.log('conv_id_state',state.current_conversation);
            // console.log('conv_id_state',payload.conv_id);
        }

        if(state.current_conversation !== null || state.current_conversation !== ''){
            if(payload.data.conv_id == state.current_conversation){
                state.scrolldown_msg = true;
            }
        }

        localStorage.setItem("chat_msgs", JSON.stringify(state.messages));
        console.log('messages set in local storage');
    },
    loadUnreadRecords(state,payload){
        var notfound = true;
        for(var i=0; i<state.unread_records.length; i++){
            if(state.unread_records[i].id ==  payload.id){
                notfound = false;
            }
        }

        if(notfound){
            state.unread_records.push({
                ...payload.data,
                id:payload.id
            });
        }

        localStorage.setItem("chat_unreadrecords", JSON.stringify(state.unread_records));
        console.log('UR set in local storage');
        
    },
    clearUnreadMsg(state,payload){
        var indexArray = [];
        for(var i = 0; i< state.unread_records.length; i++){
            if(payload.conv_id == state.unread_records[i].conv_id){
                indexArray.push(i);
            }
        }
        // console.log('indexes',indexArray);
        for(var j=0;j<indexArray.length;j++){
            state.unread_records.splice(indexArray[j], 1);
        }

        localStorage.setItem("chat_unreadrecords", JSON.stringify(state.unread_records));
        console.log('UR set in local storage');
    },
    setCurrentConversation(state,conversation_id){
        state.current_conversation = conversation_id
        localStorage.setItem("chat_currentconv", conversation_id);
    },
    setConwiseInfo(state,payload){
        state.conwise_info = payload.conwise_info

        localStorage.setItem("chat_coninfo", JSON.stringify(state.conwise_info));
        console.log('CI set in local storage');
    },
    setChatUserInfo(state,payload){
        state.user_info = payload

        localStorage.setItem("chat_uinfo", JSON.stringify(state.user_info));
        console.log('Uinfo set in local storage');
    },
    setScrollDownStatus(state,flag){
        state.scrolldown_msg = flag
    }
}