"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = void 0;
// For Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
exports.removeUser = functions.firestore.document("/users/{uid}")
    .onDelete((snapshot, context) => {
    return admin.auth().deleteUser(context.params.uid);
});
//# sourceMappingURL=index.js.map