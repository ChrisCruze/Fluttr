import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";

import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBy85Fd2IHOOpLe7wlNMyqw8cOJmRYuFdY",
  authDomain: "fluttr-rumble-capital.firebaseapp.com",
  databaseURL: "https://fluttr-rumble-capital.firebaseio.com",
  projectId: "fluttr-rumble-capital",
  storageBucket: "fluttr-rumble-capital.appspot.com",
  messagingSenderId: "952545838591",
  appId: "1:952545838591:web:abd0c3476bb833016953ca",
  measurementId: "G-W5EHKHYDFZ"
};
firebase.initializeApp(firebaseConfig);

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function loginWithFacebook() {
  await Facebook.initializeAsync("257982854408726");

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ["public_profile"] });

  if (type === "success") {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        // Handle Errors here.
      });
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          // alert("hi");
          loginWithFacebook();
        }}
      >
        <Text>Login</Text>
      </TouchableWithoutFeedback>
      <Text>A mobile app to share, propose, and brainstorm ideas with the world (built with React Native & Firebase)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
