import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from 'firebase-config';

export const getDocumentData = async (collectionName, documentName) => {
  const docRef = doc(db, collectionName, documentName);

  const result = await getDoc(docRef);
  return { ...result.data(), id: result.id };
};

export const updateDocument = async (collectionName, documentName, diff) => {
  const docRef = doc(db, collectionName, documentName);
  console.log(docRef, diff);
  await updateDoc(docRef, diff);
};
