import {WorkerArray, WorkersStore} from "@/interfaces";
import { getDatabase, ref, remove, push, get } from "firebase/database";

export default {
    namespaced: true,
    state: {
        data: {} as Record<string, WorkerArray>
    },
    mutations: {
        setData(state: WorkersStore, data: Record<string, WorkerArray>) {
            state.data = data
        }
    },
    actions: {
        async getData({ commit }: { commit: Function }) {
            try {
                const db = getDatabase();
                const response = await get(ref(db, '/'));

                commit('setData', response.val())
            } catch (e: any) {
                console.error(e.message)
                throw e
            }
        },
        async deleteWorker({ dispatch }: { dispatch: Function }, id: string) {
            try {
                const db = getDatabase();
                await remove(ref(db, `${id}`));

                await dispatch('getData');
            } catch (e: any) {
                console.error(e.message);
                throw e
            }
        },
        async addWorker({ dispatch }: { dispatch: Function }, obj: WorkerArray) {
            try {
                const db = getDatabase();
                await push(ref(db, `/`), obj);

                await dispatch('getData');
            } catch (e: any) {
                console.error(e.message);
                throw e
            }
        }
    },
    getters: {
        getStateData(state: WorkersStore): Record<string, WorkerArray> {
            return state.data
        }
    }
}