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

import type {
	QuestionDb,
	RiddleDb,
	UserDb,
	UserRiddleInfoDb
} from '../utils/DbTypes';

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

initializeFirestore(app, {
	ignoreUndefinedProperties: true
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) => {
	createUserWithEmailAndPassword(auth, email, password);
	setDoc(doc(usersCollection), { email, password });
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
