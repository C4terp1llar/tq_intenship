import { store } from "@/store";

export function sendAlert(message: string, type: 'error' | 'success') {
    store.commit('notification/showAlert', { message: message, type: type });
}