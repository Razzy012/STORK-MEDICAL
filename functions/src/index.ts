// For Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

export const removeUser = functions.firestore.document("/users/{uid}")
    .onDelete((snapshot: any, context: any) => {
      return admin.auth().deleteUser(context.params.uid);
    });
