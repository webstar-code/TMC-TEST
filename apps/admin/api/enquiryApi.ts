import { doc, updateDoc } from "firebase/firestore";
import { db } from "utils/firebase";

const updateEnquiry = async (id: string) => {
  const documentId = id; // Replace this with the actual document ID
  const docRefToUpdate = doc(db, "enquiry", documentId);
  await updateDoc(docRefToUpdate, { status: "resolved" });
};

export const enquiryApi = {
  updateEnquiry,
};
