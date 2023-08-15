import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'
const db = getFirestore();
export const getUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user);
                const docRef = doc(db, "user", user.uid);
                const userData = await getDoc(docRef);
                resolve({ uid: user.uid, ...userData.data() });
            } else {
                reject({ message: "User not exist" });
            }
        })
    })
}
export const loginUser = () => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "user", auth.currentUser.uid);
        const userData = await getDoc(docRef);
        if (userData.exists()) {
            resolve({ uid: auth.currentUser.uid, ...userData.data() });
        } else {
            const data = { uid: auth.currentUser.uid, email: auth.currentUser.email, boards: {}, name: auth.currentUser.displayName };
            await setDoc(docRef, data);
            resolve(data);
        }
    })
}
export const addMember = (data, boarData) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "boards", boarData.boardId);
        let newData;
        if (data.permission === "Owner") {
            newData = { ...boarData.owner, [data.email]:data.name }
            await setDoc(docRef, {
                "owner": newData
            }, { merge: true });
            resolve({ ...boarData, owner: newData });
        } else {
            newData = { ...boarData.member, [data.email]: data.name }
            await setDoc(docRef, {
                "member": newData
            }, { merge: true });
            resolve({ ...boarData, member: newData });
        }
    })
}