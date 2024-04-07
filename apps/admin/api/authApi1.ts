import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { auth, db } from "utils/firebase";
import { v4 as uuidv4 } from "uuid";

const getAdminById = async (id: string) => {
  const ref = doc(db, "admin", id);

  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    return null; // Or handle the case where the document doesn't exist
  }
};
const createAdmin = async (email: string, id: string) => {
  const newAdmin = {
    id: id,
    lastSignedInAt: new Date(),
    email: email,
    role: "admin",
  };

  const docRef = doc(db, "admin", id);
  await setDoc(docRef, newAdmin);
};

const logout = () => {
  signOut(auth)
    .then(() => {
      redirect("login");
    })
    .catch((error) => {});
};

export const authApi = {
  createAdmin,
  getAdminById,
  logout,
};
