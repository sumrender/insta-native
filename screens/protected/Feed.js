import { Button, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { useRootContext } from "../../context/RootContextProvider";

export default function Feed() {
  const { auth } = useRootContext();

  async function handleSignOut() {
    signOut(auth).then(() => {
      localStorage.removeItem("authUser");
      console.log("user removed!");
    });
  }
  return (
    <View>
      <Text>User Logged In</Text>
      <Button title="Sign Out" onPress={() => handleSignOut()} />
    </View>
  );
}
