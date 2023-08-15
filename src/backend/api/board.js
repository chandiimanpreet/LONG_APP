import { getFirestore, getDoc, doc, setDoc, arrayUnion, collection } from 'firebase/firestore'
import { auth } from '../firebase';
const db = getFirestore();
export const addBoard = (data, userData) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(collection(db, "boards"));
        const addData = { boardId: docRef.id, boardName: data.name, member: {}, owner: { [auth.currentUser.email]: auth.currentUser.displayName }, ticketsEntity: [{ "backlogs": [] }, { "inprogress": [] }, { "inreview": [] }, { "completed": [] }], nextId: 1 };
        await setDoc(docRef, addData);
        const userDocRef = doc(db, "user", auth.currentUser.uid);
        await setDoc(userDocRef, {
            boards: {
                ...userData.boards, [docRef.id]: data.name
            }
        }, { merge: true });
        resolve({ message: docRef.id });
    })
}
export const getBoard = (boardId) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "boards", boardId);
        const boardData = await getDoc(docRef);
        resolve(boardData.data());
    })
}