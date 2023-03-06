import { useState } from "react";
import { TextInput, View, Button } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRootContext } from "../../context/RootContextProvider";

export default function Register({ navigation }) {
  const { auth, setUserCredentials, db } = useRootContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function addUserToFirestore(uid) {
    const res = await setDoc(doc(db, "users", uid), {
      name,
      email,
    });
    console.log(res);
  }

  async function handleSignUp() {
    try {
      console.log(email, password);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await user.updateProfile({
        displayName: name,
      });
      await addUserToFirestore(user.uid);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: "orange", justifyContent: "center" }}
    >
      <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={() => handleSignUp()} title="Sign Up" />
      <Button title="Log In" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
