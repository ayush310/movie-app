import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQsyo7CEVeG_ZXthL0hi8KqkJIeUENZhc",
  authDomain: "movie-app-2cb4b.firebaseapp.com",
  projectId: "movie-app-2cb4b",
  storageBucket: "movie-app-2cb4b.appspot.com",
  messagingSenderId: "90507112166",
  appId: "1:90507112166:web:a33e395b92a9bce8089527",
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const email = result.user.email;

      localStorage.setItem("email", email);
    })
    .catch((error) => {
      console.log(error);
    });
};
