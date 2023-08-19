import { getFirestore, getDoc, doc, setDoc, arrayUnion, deleteDoc, collection } from 'firebase/firestore'
import { auth } from '../firebase';//user ko access karne ke liye
const db = getFirestore();

export const addBoard = (data, userData) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(collection(db, "boards"));
        const addData = {
            boardId: docRef.id, boardName: data.name, member: {}, owner: { [auth.currentUser.email]: auth.currentUser.displayName },
            ticketsEntity: [{ "backlogs": [] }, { "inprogress": [] }, { "inreview": [] }, { "completed": [] }], nextId: 1
        };
        await setDoc(docRef, addData);
        const userDocRef = doc(db, "user", auth.currentUser.uid);
        await setDoc(userDocRef, {
            boards: {
                ...userData.boards, [docRef.id]: data.name //joo name aa raha haii side bar see wo add kar do array main
            }
        }, { merge: true });
        resolve({ message: docRef.id });
    })
};

export const getBoard = (boardId) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "boards", boardId);
        const boardData = await getDoc(docRef);
        resolve(boardData.data());
    })
};

export const deleteBoard = (bIndex, boardData) => {
    return new Promise(async (resolve, reject) => {

        let tickets = Object.values(boardData.ticketsEntity[bIndex])[0];
        let docRef;

        tickets.forEach(async (item, idx) => {
            let ticketID = item.split('-#$%-')[0];
            docRef = doc(db, `boards/${boardData.boardId}/tickets`, ticketID);
            await deleteDoc(docRef);
        });
   
        boardData.ticketsEntity = boardData.ticketsEntity.filter((ele, idx) => {
            return bIndex !== idx
        });
       
        docRef = doc(db, `boards`, boardData.boardId);

        await setDoc(docRef, {
            ticketsEntity: boardData.ticketsEntity
        }, { merge: true });
        resolve(boardData);
    })
};

export const addNewCol = (colName, ticketsEntity, boardName) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "boards", boardName);//referance of the document
        const newCol = { [colName]: [] } //col name er vitorer jinis chai taii [colname eivabe likhte hoy]
        await setDoc(docRef, {
            ticketsEntity: arrayUnion(newCol)
        }, { merge: true });
        resolve("sucess");
    })
};