// lib/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdm_uzw1MCrfgKBtY74gUxDS4thCpv-G4",
  authDomain: "apulink-by-investinpuglia.firebaseapp.com",
  projectId: "apulink-by-investinpuglia",
  storageBucket: "apulink-by-investinpuglia.firebasestorage.app",
  messagingSenderId: "622525573318",
  appId: "1:622525573318:web:618bce514d9ec65c5d8fc7",
  measurementId: "G-8JX22DF6NY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics only on client side
let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default app;
