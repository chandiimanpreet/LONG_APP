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
export const editTicket = (id) => {
    
}
export const getTicket = (id) => {
    return new Promise(async (resolve, reject) => {
        const docRef=doc(db,"tickets",id);
        const ticket=await getDoc(docRef);
        resolve(ticket.data());
    })
}