// src/hooks/useAuth.js
import { ref } from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const user = ref(null);
const error = ref(null);

const useAuth = () => {
  const register = async (email, password) => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      user.value = response.user;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      user.value = response.user;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  const logout = async () => {
    await firebase.auth().signOut();
    user.value = null;
  };

  return {
    user,
    error,
    register,
    login,
    logout
  };
};

export default useAuth;
