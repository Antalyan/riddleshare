import { initializeApp } from 'firebase/app';
import type { User } from 'firebase/auth';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged
} from 'firebase/auth';
import type {
	CollectionReference,
	DocumentReference
} from 'firebase/firestore';
import {
	setDoc,
	collection,
	doc,
	getFirestore,
	initializeFirestore
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import type {
	QuestionDb,
	RiddleDb,
	UserDb,
	UserRiddleInfoDb
} from '../utils/DbTypes';

import { fetchUser } from './fetchingQueries';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
	projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
	storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
	messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

initializeFirestore(app, {
	ignoreUndefinedProperties: true
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = async (email: string, password: string) => {
	const user = await fetchUser(email);
	if (user) {
		throw new Error('User with given email already exists.');
	}
	createUserWithEmailAndPassword(auth, email, password);
	setDoc(doc(usersCollection), { email });
};

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => {
	authSignOut(auth);
	localStorage.removeItem('user');
};

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

export const db = getFirestore(app);

export const riddlesCollection = collection(
	db,
	'riddles'
) as CollectionReference<RiddleDb>;

export const riddlesDocument = (id: string) =>
	doc(db, 'riddles', id) as DocumentReference<RiddleDb>;

export const questionsCollection = (riddleId: string) =>
	collection(
		db,
		'riddles',
		riddleId,
		'questions'
	) as CollectionReference<QuestionDb>;

export const questionsDocument = (riddleId: string, questionId: string) =>
	doc(
		db,
		'riddles',
		riddleId,
		'questions',
		questionId
	) as DocumentReference<QuestionDb>;

export const userRiddleInfoCollection = collection(
	db,
	'userRiddleInfo'
) as CollectionReference<UserRiddleInfoDb>;

export const userRiddleInfoDocument = (id: string) =>
	doc(db, 'userRiddleInfo', id) as DocumentReference<UserRiddleInfoDb>;

export const usersCollection = collection(
	db,
	'users'
) as CollectionReference<UserDb>;

export const usersDocument = (id: string) =>
	doc(db, 'users', id) as DocumentReference<UserDb>;
