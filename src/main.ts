import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {store} from "@/store";
import {loadFonts} from './plugins/webfontloader'
import { initializeApp } from "firebase/app";

loadFonts()

const firebaseConfig = {
    apiKey: "AIzaSyAUERn1iKGzhZpHJ3CyhTCuX8gnFLhdix4",
    authDomain: "internship-927ca.firebaseapp.com",
    databaseURL: "https://internship-927ca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "internship-927ca",
    storageBucket: "internship-927ca.appspot.com",
    messagingSenderId: "236477211409",
    appId: "1:236477211409:web:ca03710d4d263a34a862b0"
};

initializeApp(firebaseConfig);

createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .mount('#app')
