import { db } from "src/firebase/Configs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const auth = getAuth();
console.log(auth)

const Register = async (data) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await updateProfile(user, {
      displayName: data.displayName,
    });
    return user
  } catch (error) {
    console.log(error.message);
    console.log(typeof error.message);

    let systemErrorMessage;

    if (error.message.includes("Password")) {
      systemErrorMessage = "A senha precisa conter pelo menos 6 caracters.";
    } else if (error.message.includes("email-already")) {
      systemErrorMessage = "E-mail já cadastrado.";
    } else {
      systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
    }
  }
};
const Login = async (data) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
    return user
  } catch (error) {
    console.log(error.message);
    console.log(typeof error.message);

    if (error.message.includes("auth/invalid-credential")) {
      systemErrorMessage = "Email ou senha incorretos";
    } else {
      systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
    }
  }
};
const logout = () => {
  signOut(auth);
};

export { Register, Login, logout };
