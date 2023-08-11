
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBGydDK94Gb2IgP5byAKCaVNUu1nDJy7ZA",
    authDomain: "long-2f692.firebaseapp.com",
    projectId: "long-2f692",
    storageBucket: "long-2f692.appspot.com",
    messagingSenderId: "860541287583",
    appId: "1:860541287583:web:443387398e74dd1d88b6aa"
};

initializeApp(firebaseConfig);


const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };