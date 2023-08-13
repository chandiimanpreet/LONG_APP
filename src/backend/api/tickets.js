import { getFirestore, getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth } from '../firebase'
const db = getFirestore();
export const addTicket = (data, columnIndex, columnName, boardData) => {
    return new Promise(async (resolve, reject) => {
        let docRef = doc(db, `boards/${boardData.boardName}/tickets`, boardData.nextId.toString());
        await setDoc(docRef, {
            ...data, createdAt: serverTimestamp(), status: columnName, createdBy: auth.currentUser.email
        });
        docRef = doc(db, "boards", boardData.boardName);
        let newBoardData = { ...boardData, nextId: boardData.nextId + 1 }
        newBoardData.ticketsEntity[columnIndex] = { [columnName]: [...boardData.ticketsEntity[columnIndex][columnName], boardData.nextId + "-#$%-" + data.title + "-#$%-" + data.assignee] };
        await setDoc(docRef, {
            ticketsEntity: boardData.ticketsEntity,
            nextId: boardData.nextId + 1
        }, { merge: true })
        resolve({ ...newBoardData });
    })
}
export const deleteTicket = (id) => {

}

export const moveTicket = (sourceColumn, sourceIndex, destinationColumn, destinationIndex, boardName, boardData) => {
    return new Promise(async (resolve, reject) => {
        let docRef = doc(db, "boards", boardName);
        let source = boardData.ticketsEntity[Number(sourceColumn)][Object.keys(boardData.ticketsEntity[Number(sourceColumn)])[0]];
        let destination = boardData.ticketsEntity[Number(destinationColumn)][Object.keys(boardData.ticketsEntity[Number(destinationColumn)])[0]];
        const moveData = source[sourceIndex];
        source.splice(Number(sourceIndex), 1);
        destination.splice(Number(destinationIndex), 0, moveData);
        boardData.ticketsEntity[sourceColumn] = { [Object.keys(boardData.ticketsEntity[Number(sourceColumn)])[0]]: source };
        boardData.ticketsEntity[destinationColumn] = { [Object.keys(boardData.ticketsEntity[Number(destinationColumn)])[0]]: destination };
        console.log(boardData);
        await setDoc(docRef, { ticketsEntity: boardData.ticketsEntity }, { merge: true });
        docRef = doc(db, `boards/elaichi/tickets`, moveData.split("-#$%-")[0]);
        await setDoc(docRef, { status: Object.keys(boardData.ticketsEntity[Number(destinationColumn)])[0] }, { merge: true });
        resolve({ message: "success" })
    })
}
export const getTicket = (id) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "tickets", id);
        const ticket = await getDoc(docRef);
        resolve(ticket.data());
    })
}