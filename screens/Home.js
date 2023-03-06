import { useRootContext } from "../context/RootContextProvider";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Feed from "./protected/Feed";
import Profile from "./protected/Profile";
import Add from "./protected/Add";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EmptyCmp = () => null;

export default function Home({ navigation }) {
  const { userCredentials, auth } = useRootContext();

  return (
    <>
      {userCredentials.loading ? (
        <>Loading</>
      ) : (
        <NavigationContainer>
          {!userCredentials.user ? (
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator initialRouteName="Feed">
              <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="home-circle"
                      size={24}
                      color="black"
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Add"
                component={Add}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="plus-circle"
                      size={24}
                      color="black"
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="account-circle"
                      size={24}
                      color="black"
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </>
  );
}
