import { initializeApp } from 'firebase/app';
import type { User } from 'firebase/auth';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged
} from 'firebase/auth';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyAc_Kn5Kb3QBP6yOyqxWsnwxF2tNrSXuh0',
	authDomain: 'pv247-7116c.firebaseapp.com',
	projectId: 'pv247-7116c',
	storageBucket: 'pv247-7116c.appspot.com',
	messagingSenderId: '781926155473',
	appId: '1:781926155473:web:452b5910c0a7477844f1f0'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);
