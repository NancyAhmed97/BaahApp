import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GirlsQ from "./GirlsQ";
import BoysQ from "./BoysQ";
import GeneralQ from "./GeneralQ";
import Daily from "./Daily";
import MainHome from "./MainHome";
import Splashsc from "./Splashsc";
import Login from "./Login";
import LoginOTP from "./LoginOTP";
import SplashTwo from "./SplashTwo";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "white" },
          headerShown: false, // Set the background color here and remove header
        }}
      >
        <Stack.Screen name="Splashsc" component={Splashsc} />
        <Stack.Screen name="SplashTwo" component={SplashTwo} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginOTP" component={LoginOTP} />
        <Stack.Screen name="GeneralQ" component={GeneralQ} />
        <Stack.Screen name="GirlsQ" component={GirlsQ} />
        <Stack.Screen name="BoysQ" component={BoysQ} />
        <Stack.Screen name="Daily" component={Daily} />
        <Stack.Screen name="MainHome" component={MainHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
