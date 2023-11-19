// Mengimpor fungsi initializeApp dari modul Firebase App. 
// Ini digunakan untuk menginisialisasi aplikasi Firebase.
import { initializeApp } from "firebase/app";

// Mengimpor fungsi getAuth dari modul Firebase Authentication. 
// Ini digunakan untuk mendapatkan instansi Firebase Authentication.
import { getAuth } from "firebase/auth";

// Mengimpor fungsi getFirestore dari modul Firebase Firestore. 
// Ini digunakan untuk mendapatkan instansi Firebase Firestore.
import { getFirestore } from "firebase/firestore";

// Mengimpor fungsi getStorage dari modul Firebase Storage. 
// Ini digunakan untuk mendapatkan instansi Firebase Storage.
import { getStorage } from "firebase/storage";

// Mendefinisikan objek firebaseConfig yang berisi konfigurasi Firebase seperti apiKey, authDomain, projectId,
// dan objek ini kita dapatkan setelah kita selesai membuat project di firebase dan dapat di akses pada menu project settings
// yahg ada di menu dashboard firebase 
const firebaseConfig = {
  apiKey: "AIzaSyC9I7jGyzx5an487mqhDYwHibI3HFEZ4-g",
  authDomain: "reactjs-auth-f153e.firebaseapp.com",
  projectId: "reactjs-auth-f153e",
  storageBucket: "reactjs-auth-f153e.appspot.com",
  messagingSenderId: "527985373708",
  appId: "1:527985373708:web:28277eb9084e8983a03429"
};

// Menginisialisasi aplikasi Firebase dengan menggunakan konfigurasi yang telah didefinisikan sebelumnya.
const app = initializeApp(firebaseConfig);

// Mendapatkan instansi Firebase Authentication dari aplikasi yang telah diinisialisasi.
const auth = getAuth(app);

// Mendapatkan instansi Firebase Firestore dari aplikasi yang telah diinisialisasi.
const db:any = getFirestore(app);

// Mendapatkan instansi Firebase Storage dari aplikasi yang telah diinisialisasi.
const storage = getStorage(app);

// Mengeskpor instansi Firebase Authentication, Firestore, dan Storage agar dapat digunakan 
// di seluruh aplikasi React.
export { auth, db, storage }