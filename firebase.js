import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { 
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
 getDoc,
 } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDZcmrNANX_jokUu0CUFLJr3zLKMFF8SrQ",
  authDomain: "first-project-76be1.firebaseapp.com",
  projectId: "first-project-76be1",
  storageBucket: "first-project-76be1.firebasestorage.app",
  messagingSenderId: "336585617785",
  appId: "1:336585617785:web:e5863b31843d60fe6ebfa8",
  measurementId: "G-QK2873MGMP"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export let signup = async ()=> {
  try {
    let userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log (userCredential)
    console.log ("user successfully registered")

//     const docRef = await addDoc(collection(db, "users"), {
//       firstName: firstName.value,
//       last: lastName.value,
//       userName: userName.value,
// email: email.value,
// password: password.value
//     });

let uid = userCredential.user.uid

await setDoc(doc(db, "users", uid), {
  firstName: firstName.value,
  lastName: lastName.value,
  userName: userName.value,
email: email.value,
password: password.value
});

    console.log ("user ka data store hogya")

    window.location.href = "../home/home.html"

  } catch (err) {
console.log (err)
  }
}

export let isUserExist = async ()=> {
  return new Promise((resolve, reject)=> {
    onAuthStateChanged(auth, (user) => {
      if (user) {
console.log ("user exist karta hai")
let uid = user.uid
resolve(uid)
    } else {
console.log ("user exist nhi karta")

// agar user exist nhi karta tu signup.html page par redirect kar de ga
setTimeout(()=> {
  window.location.href = "../index.html"
}, 3000)}

})

  });
}

export let signin = async ()=> {
  try {
    let userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log (userCredential.user.uid)
    // console.log (email.value)
   console.log ("user login hogya")

  //  setTimeout lagana hai home.html ke liye
  setTimeout(()=> {
    window.location.href = "../home/home.html"
  }, 3000)

  } catch (err) {
console.log (err)
  }
}

export let getSingleDocument = async (uid)=> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log(docSnap.id, docSnap.data());
    return docSnap.data()
  } else {
    console.log("No such document!");
  }
}

export let logout = async () => {
  try {
    await signOut(auth);
    console.log("User successfully logged out hoo gya");
  
setTimeout(()=> {
  window.location.href = "../login/login.html";
}, 2000)

  } catch (error) {
    console.error("error ==>>", error);
  }
};