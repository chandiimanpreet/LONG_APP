import { getFirestore, getDoc, doc, setDoc, addDoc, collection, } from 'firebase/firestore'
const db = getFirestore();
export const addTicket = (data) => {
    return new Promise(async (resolve, reject) => {
        const collectionRef = collection(db, "tickets");
        await addDoc(collectionRef, data);
        resolve({ message: "successful" });
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
        docRef=doc(db,`boards/elaichi/tickets`,moveData.split("+")[0]);
        await setDoc(docRef,{status:Object.keys(boardData.ticketsEntity[Number(destinationColumn)])[0]},{merge:true});
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