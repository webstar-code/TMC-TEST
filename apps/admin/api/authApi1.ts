import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { auth, db } from "utils/firebase";
import { v4 as uuidv4 } from 'uuid';

const getAdminById = async (id: string) => {

    console.log('we are get admin')
    const ref = doc(db, 'admin', id);

    const docSnap = await getDoc(ref);
    console.log(docSnap)
    console.log("[Data]", docSnap.data())
    const data = docSnap.data()
    return data
}


const createAdmin = async (email: string) => {
    const id = uuidv4();
    const newAdmin = {
        id: id,
        lastSignedInAt: new Date(),
        email: email,
        role: 'admin'
    };

    const docRef = doc(db, 'admin', id);
    await setDoc(docRef, newAdmin);
}

const logout = () => {
    signOut(auth).then(() => {
        redirect('login')
    }).catch((error) => {

    });
}

export const authApi = {
    createAdmin,
    getAdminById,
    logout
}