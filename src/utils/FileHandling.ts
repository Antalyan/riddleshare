import imageBlobReduce from 'image-blob-reduce';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '../datastore/firebase';

const LIMIT_FILE_SIZE = 100000; //Max allowed size in bytes without cropping
const MAX_FILE_SIZE = 500;

export const uploadFile = async (imageFile: Blob) => {
	const imageRef = ref(storage, `images/${imageFile.name + uuidv4()}`);
	if (imageFile.size > LIMIT_FILE_SIZE) {
		console.log(`Image size reduced from ${imageFile.size}.`);
		const reduce = imageBlobReduce();
		imageFile = await reduce.toBlob(imageFile, { max: MAX_FILE_SIZE });
	}
	return await uploadBytes(imageRef, imageFile)
		.then(snapshot => snapshot.metadata.fullPath)
		.then(() => getDownloadURL(imageRef));
};
