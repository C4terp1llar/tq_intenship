import {NotificationStore} from "@/interfaces";

export default {
    namespaced: true,
    state: {
        isVisible: false,
        message: '' as string,
        type: '' as 'error' | 'success'
    },
    mutations: {
        showAlert(state: NotificationStore, payload: {message: string, type: 'error' | 'success'}) {
            state.isVisible = true;
            state.message = payload.message;
            state.type = payload.type;
            setTimeout(() => {
                state.isVisible = false;
            }, 3000)
            setTimeout(() => {
                state.message = '';
                state.type = '';
            }, 3500)
        }
    },
    getters: {
        getVisibility(state: NotificationStore) {
            return state.isVisible
        },
        getMessage(state: NotificationStore) {
            return state.message
        },
        getType(state: NotificationStore) {
            return state.type
        }
    }
}
