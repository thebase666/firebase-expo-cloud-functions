import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const createUserProfile = functions.auth
  .user()
  .onCreate(async (user) => {
    const uid = user.uid;
    const email = user.email ?? "";
    const nickname = email.split("@")[0] || "New User";

    await db.collection("users").doc(uid).set(
      {
        uid,
        email,
        nickname,
        avatarUrl: "",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    );
  });
