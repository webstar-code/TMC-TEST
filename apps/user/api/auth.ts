import { signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { auth, callable, db, dbCollections, functions } from 'lib/firebase';
import { IUser } from 'lib/store';
import { httpsCallable } from 'firebase/functions';

type IResponseStatus = "ok" | "failed"
interface IResponse<T> {
  status: IResponseStatus,
  data: T | null,
  message: string
}

const getUserByEmail = async (email: string): Promise<IResponse<IUser>> => {
  const q = query(collection(db, dbCollections.users), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    const docs = querySnapshot.docs.map((i) => i.data() as IUser);
    return ({ status: "ok", data: docs[0], message: "" })
  } else {
    return ({ status: "ok", data: null, message: "No User Found." })
  }
};

const getUserById = async (id: string): Promise<IResponse<IUser>> => {
  const ref = doc(db, dbCollections.users, id);
  const data = (await getDoc(ref)).data() as IUser;
  if (data) {
    return ({ status: "ok", data: data, message: "" })
  } else {
    return ({ status: "ok", data: null, message: "No User Found." })
  }
};

const sendOTP = async (email: string) => {
  return await httpsCallable<unknown, { status: number; message: string }>(
    functions,
    callable.sendOtp
  )({ email })
    .then((result) => result.data)
    .catch((err) => {
      throw err;
    });
};

const verifyOTP = async (email: any, otp: any) => {
  return await httpsCallable<unknown, { status: number; success: boolean; message: string }>(
    functions,
    callable.verifyOtp
  )({ email, otp })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      throw err;
    });
};

const resetPassword = async (uid: string, newPassword: string) => {
  return await httpsCallable<unknown, { status: number; success: boolean; message: string }>(
    functions,
    callable.resetPassword
  )({ uid, newPassword })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      throw err;
    });
};



const createUser = async (id: string, email: string): Promise<IResponse<IUser>> => {
  const newCustomer: IUser = {
    id,
    email,
    createdAt: new Date(),
    updatedAt: new Date(),
    isSubscriptionActive: false,
    isSubscriptionPurchased: false,
    preferences: { langauge: "en" },
  };
  return await setDoc(doc(db, dbCollections.users, id), newCustomer)
    .then(() => ({ status: "ok" as const, data: newCustomer, message: "" }))
    .catch((err) => ({ status: "failed", data: null, message: err }));
};

const logout = async () => {
  return await signOut(auth)
    .then(() => ({ status: "ok" as const, data: null, message: "Logged out" }))
    .catch((err) => ({ status: "failed", data: null, message: err }));
};

export const authApi = {
  getUserByEmail,
  logout,
  sendOTP,
  verifyOTP,
  createUser,
  getUserById,
  resetPassword
};