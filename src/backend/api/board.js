import { getFirestore, getDoc, doc, setDoc, arrayUnion } from 'firebase/firestore'
import { auth } from '../firebase';
const db = getFirestore();
export const addBoard = (data) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "boards", data.name);
        const board = await getDoc(docRef);
        console.log(board.exists());
        if (board.exists()) {
            resolve({ message: "name already exists" });
        } else {
            const addData = { member: [], owner: [], ticketsEntity: [{ "backlogs": [] }, { "inprogress": [] }, { "inreview": [] }, { "completed": [] }], nextId: 1 };
            await setDoc(docRef, addData);
            const userDocRef = doc(db, "user", auth.currentUser.uid);
            await setDoc(userDocRef, {
                boards: arrayUnion(data.name)
            }, { merge: true });
            resolve({ message: "success" })
        }
    })
}
export const getBoard = (name) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "boards", name);
        const boardData = await getDoc(docRef);
        resolve(boardData.data());
    })
}