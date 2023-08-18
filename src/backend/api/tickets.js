import { getFirestore, getDoc, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { auth } from '../firebase'
const db = getFirestore();

export const addTicket = (data, columnIndex, columnName, boardData) => {
    return new Promise(async (resolve, reject) => {
        let docRef = doc(db, `boards/${boardData.boardId}/tickets`, boardData.nextId.toString());
        await setDoc(docRef, {
            ...data, createdAt: serverTimestamp(), status: columnName, createdBy: auth.currentUser.email
        });
        docRef = doc(db, "boards", boardData.boardId);
        let newBoardData = { ...boardData, nextId: boardData.nextId + 1 }
        newBoardData.ticketsEntity[columnIndex] = { [columnName]: [...boardData.ticketsEntity[columnIndex][columnName], boardData.nextId + "-#$%-" + data.title + "-#$%-" + (boardData.owner[data.assignee] === undefined ? boardData.member[data.assignee] : boardData.owner[data.assignee])] };
        await setDoc(docRef, {
            ticketsEntity: boardData.ticketsEntity,
            nextId: boardData.nextId + 1
        }, { merge: true })
        resolve({ ...newBoardData });
    })
};

export const deleteTicket = (ticketID, bIndex, index, boardData) => {

    return new Promise(async (resolve, reject) => {
        let docRef = doc(db, `boards/${boardData.boardId}/tickets`, ticketID);
        await deleteDoc(docRef);

        let updatedData = boardData.ticketsEntity[bIndex];
        let columnName = Object.keys(updatedData)[0];
        updatedData = updatedData[Object.keys(updatedData)[0]];

        updatedData.splice(Number(index), 1);
        boardData.ticketsEntity[bIndex] = { [columnName]: updatedData };

        docRef = doc(db, `boards`, boardData.boardId);

        await setDoc(docRef, {
            ticketsEntity: boardData.ticketsEntity
        }, { merge: true });
        resolve(boardData);
    })

}

export const moveTicket = (sourceColumn, sourceIndex, destinationColumn, destinationIndex, boardData) => {
    return new Promise(async (resolve, reject) => {
        let docRef = doc(db, "boards", boardData.boardId);
        let source = boardData.ticketsEntity[Number(sourceColumn)][Object.keys(boardData.ticketsEntity[Number(sourceColumn)])[0]];
        let destination = boardData.ticketsEntity[Number(destinationColumn)][Object.keys(boardData.ticketsEntity[Number(destinationColumn)])[0]];
        const moveData = source[sourceIndex];
        source.splice(Number(sourceIndex), 1);
        destination.splice(Number(destinationIndex), 0, moveData);
        boardData.ticketsEntity[sourceColumn] = { [Object.keys(boardData.ticketsEntity[Number(sourceColumn)])[0]]: source };
        boardData.ticketsEntity[destinationColumn] = { [Object.keys(boardData.ticketsEntity[Number(destinationColumn)])[0]]: destination };
        console.log(boardData);
        await setDoc(docRef, { ticketsEntity: boardData.ticketsEntity }, { merge: true });
        docRef = doc(db, `boards/${boardData.boardId}/tickets`, moveData.split("-#$%-")[0]);
        await setDoc(docRef, { status: Object.keys(boardData.ticketsEntity[Number(destinationColumn)])[0] }, { merge: true });
        resolve({ message: "success" })
    })
};

export const getTicket = (id, boardId) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, `boards/${boardId}/tickets`, id);
        const ticket = await getDoc(docRef);
        resolve(ticket.data());
    })
};

export const editTicket = (id, columnIndex, rowIndex, boardData, data) => {
    return new Promise(async (resolve, reject) => {
        let docRef = doc(db, `boards/${boardData.boardId}/tickets`, id);
        await setDoc(docRef, {
            ...data, updatedAt: serverTimestamp()
        }, { merge: true });
        docRef = doc(db, "boards", boardData.boardId);
        const columnName = Object.keys(boardData.ticketsEntity[columnIndex])[0];
        let newData = boardData.ticketsEntity[columnIndex][columnName];
        newData[rowIndex] = id + "-#$%-" + data.title + "-#$%-" + (boardData.owner[data.assignee] === undefined ? boardData.member[data.assignee] : boardData.owner[data.assignee])
        let newBoardData = boardData.ticketsEntity;
        newBoardData[columnIndex] = { [columnName]: newData };
        await setDoc(docRef, {
            ticketsEntity: newBoardData
        }, { merge: true });
        resolve(newBoardData);
    })
};