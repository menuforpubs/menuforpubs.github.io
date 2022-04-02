import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

import { db } from 'firebase-config';

export const getDocumentData = async (collectionName, documentName) => {
  const docRef = doc(db, collectionName, documentName);

  const result = await getDoc(docRef);
  return { ...result.data(), id: result.id };
};

export const updateDocument = async (collectionName, documentName, diff) => {
  const docRef = doc(db, collectionName, documentName);
  await updateDoc(docRef, diff);
};

export const getAllDocumentsFromCollection = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const response = await getDocs(collectionRef);
  let result = [];
  response.forEach((doc) => result.push({ ...doc.data(), id: doc.id }));
  return result;
};
