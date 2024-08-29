'use client'
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React , {useContext, useState, useEffect} from 'react'


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState(null);
  const [loading, setLoading] = useState(true);

  // AUTH HUNDERS

  function signup (email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login (email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout () {
    setUserDataObj({});
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, async user => {
      
      try {
          setLoading(true);
          setCurrentUser(user);
          if(!user) {
            console.log('NOT USER FOUND');
            
            return 
          }

          // if user exist fetch data from firestore db

          console.log('Fetching User Data');
          
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          let firebaseData = {};

          if(docSnap.exists()) {
            firebaseData = docSnap.data();
            console.log('Found User Data');
            console.log(firebaseData);
          }

          setUserDataObj(firebaseData);

      } catch (err) {
        console.error(err.message);
        
      } finally {
        setLoading(false);
      }
    })
    return unsubscribe;
  }, [])
  
  const value = {
    currentUser,
    userDataObj,
    setUserDataObj,
    loading,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
