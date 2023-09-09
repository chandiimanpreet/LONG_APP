import { getFirestore, getDoc, doc, setDoc, serverTimestamp, runTransaction } from 'firebase/firestore'
import { auth } from '../firebase'
export const db = getFirestore();

export const addTicket = (data, columnIndex, columnName, boardData) => {
    return new Promise(async (resolve, reject) => {
        let docRef = doc(db, `boards/${boardData.boardId}/tickets`, boardData.nextId.toString());
        await setDoc(docRef, {
            ...data, createdAt: serverTimestamp(), status: columnName, createdBy: auth.currentUser.email
        });
        docRef = doc(db, "boards", boardData.boardId);
        let newBoardData = { ...boardData, nextId: boardData.nextId + 1 }
        newBoardData.ticketsEntity[columnIndex] = { [columnName]: [...boardData.ticketsEntity[columnIndex][columnName], boardData.nextId + "-#$%-" + data.title + "-#$%-" + data.assignee] };
        await setDoc(docRef, {
            ticketsEntity: boardData.ticketsEntity,
            nextId: boardData.nextId + 1
        }, { merge: true })
        resolve({ ...newBoardData });
    })
};

export const deleteTicket = (ticketID, bIndex, index, boardData) => {

    return new Promise(async (resolve, reject) => {
        let ticketDocref = doc(db, `boards/${boardData.boardId}/tickets`, ticketID);
        let boardDocref = doc(db, `boards`, boardData.boardId);

        let updatedData = boardData.ticketsEntity[bIndex];
        let columnName = Object.keys(updatedData)[0];
        updatedData = updatedData[Object.keys(updatedData)[0]];
        updatedData.splice(Number(index), 1);
        boardData.ticketsEntity[bIndex] = { [columnName]: updatedData };
        try {
            await runTransaction(db, async (transaction) => {
                const ticketDoc = await transaction.get(ticketDocref);
                const boardDoc = await transaction.get(boardDocref);
                if (!ticketDoc.exists() || !boardDoc.exists()) {
                    throw new Error("Document doesn't exists");
                }
                transaction.delete(ticketDocref);
                transaction.set(boardDocref, {
                    ticketsEntity: boardData.ticketsEntity
                }, { merge: true });
                resolve(boardData);
            })
        }
        catch (e) {
            reject(e);
        }
    })

}

export const moveTicket = (sourceColumn, sourceIndex, destinationColumn, destinationIndex, boardData) => {
    return new Promise(async (resolve, reject) => {
        let boardDocref = doc(db, "boards", boardData.boardId);
        let source = boardData.ticketsEntity[Number(sourceColumn)][Object.keys(boardData.ticketsEntity[Number(sourceColumn)])[0]];
        let destination = boardData.ticketsEntity[Number(destinationColumn)][Object.keys(boardData.ticketsEntity[Number(destinationColumn)])[0]];
        const moveData = source[sourceIndex];
        let ticketDocref = doc(db, `boards/${boardData.boardId}/tickets`, moveData.split("-#$%-")[0]);
        source.splice(Number(sourceIndex), 1);
        destination.splice(Number(destinationIndex), 0, moveData);
        let newBoardData = { ...boardData };
        newBoardData.ticketsEntity[sourceColumn] = { [Object.keys(newBoardData.ticketsEntity[Number(sourceColumn)])[0]]: source };
        newBoardData.ticketsEntity[destinationColumn] = { [Object.keys(newBoardData.ticketsEntity[Number(destinationColumn)])[0]]: destination };

        try {
            await runTransaction(db, async (transaction) => {
                const boardDoc = await transaction.get(boardDocref);
                const ticketDoc = await transaction.get(ticketDocref);
                if (!ticketDoc.exists() || !boardDoc.exists()) {
                    throw new Error("Document doesn't exist");
                }
                transaction.set(boardDocref, {
                    ticketsEntity: newBoardData.ticketsEntity
                }, { merge: true });
                transaction.set(ticketDocref, {
                    status: Object.keys(newBoardData.ticketsEntity[Number(destinationColumn)])[0]
                }, { merge: true })
            })
            resolve(newBoardData);
        } catch (e) {
            reject(e);
        }
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
        let ticketDocref = doc(db, `boards/${boardData.boardId}/tickets`, id);
        let boardDocref = doc(db, "boards", boardData.boardId);
        const columnName = Object.keys(boardData.ticketsEntity[columnIndex])[0];
        let newData = boardData.ticketsEntity[columnIndex][columnName];
        newData[rowIndex] = id + "-#$%-" + data.title + "-#$%-" + data.assignee
        let newBoardData = boardData.ticketsEntity;
        newBoardData[columnIndex] = { [columnName]: newData };
        try {
            await runTransaction(db, async (transaction) => {
                const ticketDoc = await transaction.get(ticketDocref);
                const boardDoc = await transaction.get(boardDocref);
                if (!ticketDoc.exists() || !boardDoc.exists()) {
                    throw new Error("Document doesn't exist");
                }
                transaction.set(ticketDocref, {
                    ...data, updatedAt: serverTimestamp()
                }, { merge: true });
                transaction.set(boardDocref, {
                    ticketsEntity: newBoardData
                }, { merge: true })
                resolve(newBoardData);
            })
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
};