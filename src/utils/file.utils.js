import { ref, getDownloadURL, listAll } from 'firebase/storage';

import { storage } from 'firebase-config';

export const getFileAsync = async (path) => {
  const url = await getDownloadURL(ref(storage, path));
  return url;
};

export const getAllFilesAsync = async (path) => {
  const listRef = ref(storage, path);

  const res = await listAll(listRef);
  const urls = await Promise.all(
    res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return { path: itemRef.name, url };
    })
  );

  return urls;
};
