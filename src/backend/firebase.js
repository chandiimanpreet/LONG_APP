
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBGydDK94Gb2IgP5byAKCaVNUu1nDJy7ZA",
    authDomain: "long-2f692.firebaseapp.com",
    projectId: "long-2f692",
    storageBucket: "long-2f692.appspot.com",
    messagingSenderId: "860541287583",
    appId: "1:860541287583:web:443387398e74dd1d88b6aa"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

// create a layout
export const createSubLayout = (data) => {
    const docRef = doc(db, "subLayouts", data.id);
    setDoc(docRef, data);
}
//create a ticket for a layout 
export const createTicket = (data) => { 
    const docRef = doc(db, "tickets", data.id);
    setDoc(docRef, data);
}


export { auth, provider };