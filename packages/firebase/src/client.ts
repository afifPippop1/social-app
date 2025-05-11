import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "demo-api-key",
  authDomain: "localhost",
  projectId: "your-project-id",
});
const auth = getAuth(app);
const db = getFirestore(app);

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8080);

export { auth, db };
