// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAoHV2nbqAszxBodUQs1U-aH8K64ob_q-Q',
  authDomain: 'senior-project-62fa0.firebaseapp.com',
  projectId: 'senior-project-62fa0',
  storageBucket: 'senior-project-62fa0.appspot.com',
  messagingSenderId: '816295740024',
  appId: '1:816295740024:web:087a64819d0279e159638d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export default app;
