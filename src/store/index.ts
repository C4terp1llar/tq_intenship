import {createStore} from 'vuex';
import workersStore from "@/store/workersStore";
import notification from "@/store/notification";


export const store = createStore({
    modules: {
        workersStore, notification
    }
});
