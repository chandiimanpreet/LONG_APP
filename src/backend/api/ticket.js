// import { getFirestore} from 'firebase/firestore';
// const db = getFirestore();
// export const getTickets = ()=>{
//     createTicket(auth, async (user) => {
//         if (user) {
//             try {
//                 const snapshot = await getDoc(doc(db, "UserChargingRegister", user.uid));
//                 if (snapshot.exists()) {
//                     resolve({ user: snapshot.data() });
//                 } else {
//                     reject({ error: "User doesn't exists" });
//                 }
//             }
//             catch (error) {
//                 reject({ error: error.message });
//             }
//         } else {
//             reject({ error: "User doesn't exists" });
//         }
//     })
// }