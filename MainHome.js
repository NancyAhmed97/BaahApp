import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import FavoriteScreen from "./FavoriteScreen";
import Subscription from "./Subscription";
import MessageScreen from "./MessageScreen";
import CustomTabBarButton from "./CustomTabBarButton"; // Make sure to import CustomTabBarButton
import { FavoritesProvider } from "./FavoritesContext";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

const MainHome = () => {
  return (
    <FavoritesProvider>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="Subscription"
          component={Subscription}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <MaterialCommunityIcons
                  name={focused ? "currency-usd" : "currency-usd-off"}
                  size={25}
                  color={focused ? "#e32f45" : "#748c94"}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  الإشتراكات
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("./assets/message.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  الرسائل
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="plus"
                size={30} // Set size to 30
                color={"#fff"}
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />

        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <MaterialCommunityIcons
                  name={focused ? "star" : "star-outline"}
                  size={30}
                  color={focused ? "#e32f45" : "#748c94"}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  المفضلة
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <AntDesign
                  name={focused ? "profile" : "profile"}
                  size={25}
                  color={focused ? "#e32f45" : "#748c94"}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  ملفي الشخصي
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </FavoritesProvider>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5D50",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default MainHome;
