"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const app = (0, app_1.initializeApp)({
    apiKey: "demo-api-key",
    authDomain: "localhost",
    projectId: "your-project-id",
});
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
(0, auth_1.connectAuthEmulator)(auth, "http://localhost:9099");
(0, firestore_1.connectFirestoreEmulator)(db, "localhost", 8080);
//# sourceMappingURL=client.js.map