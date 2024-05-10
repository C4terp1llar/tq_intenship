import {createStore} from 'vuex';
import {getDatabase, ref, get, remove, push} from 'firebase/database';
import {WorkerArray} from "@/interfaces";

export const store = createStore({
    // решил все-таки добавить стейт для удобства, но все равно после каждой операции данные берутся из бд
    state: {
        data: {} as { [key: string]: WorkerArray }
    },
    mutations: {
        setData(state, data: { [key: string]: WorkerArray }) {
            state.data = data
        }
    },
    actions: {
        async getData({commit}) {
            try {
                const db = getDatabase();
                const response = await get(ref(db, '/'));

                commit('setData', response.val())
            } catch (e: any) {
                console.error(e.message);
            }
        },
        async deleteWorker({dispatch}, id: string) {
            try {
                const db = getDatabase();
                await remove(ref(db, `${id}`));

                await dispatch('getData');
            } catch (e: any) {
                console.error(e.message);
            }
        },
        async addWorker({dispatch}, obj) {
            try {
                const db = getDatabase();
                await push(ref(db, `/`), obj);

                await dispatch('getData');
            } catch (e: any) {
                console.error(e.message);
            }
        }
    },
    getters: {
        getStateData(state) {
            return state.data
        }
    }
});
