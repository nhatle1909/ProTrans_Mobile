import * as firebase from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx13_LyfBOUA9bDZ0V_ekYLawYM0bNlOw",
  authDomain: "protrans-29572.firebaseapp.com",
  projectId: "protrans-29572",
  storageBucket: "protrans-29572.appspot.com",
  messagingSenderId: "781247578588",
  appId: "1:781247578588:web:696a5b7051eca931fe0f19",
  measurementId: "G-8WL75SJ52Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const getURIImage =  (name:string)=>{
  const storageRef = ref(storage, `Images/${name}.png`);
  getDownloadURL(storageRef).then((url) => {
    return url;
  })
  .catch((error) => {
    console.error('Error getting download URL:', error);
    return null; // Or handle the error appropriately
  });
}
// Function to upload image from base64 string
export const UploadBase64Image = async (image : string,name:string) =>{
  const storageRef = ref(storage, `Images/${name}.png`);
  const blob = await fetch(image).then(response => response.blob());

  try {
    const uploadTask = uploadBytes(storageRef, blob);

    await uploadTask; // Wait for the upload to complete

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);   

    return null;
  }
};
