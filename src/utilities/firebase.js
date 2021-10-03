import React, {useState, useEffect} from 'react'
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCXS4SmvsI-ADQkOKth_6F4rHOrAIhDBI0",
    authDomain: "scheduler-4ce4e.firebaseapp.com",
    databaseURL: "https://scheduler-4ce4e-default-rtdb.firebaseio.com",
    projectId: "scheduler-4ce4e",
    storageBucket: "scheduler-4ce4e.appspot.com",
    messagingSenderId: "705930820188",
    appId: "1:705930820188:web:4247fe369fed3a916d4499",
    measurementId: "G-QF64FT6SZY"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

export const setData = (path, value) => (
    set(ref(database, path), value)
);
