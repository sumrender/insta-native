import { useState } from "react";
import { TextInput, View, Button } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRootContext } from "../../context/RootContextProvider";

export default function Landing({ navigation }) {
  const { auth } = useRootContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: "orange", justifyContent: "center" }}
    >
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={() => handleSignIn()} title="Sign In" />
      <Button
        title="Create a new account"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}
