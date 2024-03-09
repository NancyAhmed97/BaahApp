import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("SA"); // Set default country code to "SA" (Saudi Arabia)
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const navigation = useNavigation();

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCountryPickerVisible(false);
  };

  const toggleCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
  };

  const handlePreviousClick = () => {
    navigation.navigate("SplashTwo");
  };

  const handleNextClick = () => {
    navigation.navigate("LoginOTP");
  };
console.log("countryCode",
phoneNumber

);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={styles.container}>
        <Text
          style={{
            color: "black",
            fontSize: 26,
            fontFamily: "Cairo",
            fontWeight: "500",
            lineHeight: 170,
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          {"ما هو رقم هاتفك ؟"}
        </Text>
        <View style={styles.phoneInput}>
          <TouchableOpacity onPress={toggleCountryPicker}>
            <CountryPicker
              countryCode={countryCode}
              withFlagButton={true}
              withFilter={true}
              withFlag={true}
              withCountryNameButton={false}
              withAlphaFilter={true}
              withCallingCode={true}
              onSelect={onSelectCountry}
              visible={countryPickerVisible}
              onClose={() => setCountryPickerVisible(false)}
              containerButtonStyle={styles.countryPickerButton}
              closeButtonImageStyle={styles.countryPickerCloseButton}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="رقم الجوال"
            keyboardType="numeric"
            onChangeText={(text) => {
              setPhoneNumber(text.replace(/[^0-9]/g, ""))
            }} // Update this line
            value={phoneNumber}
          />
        </View>
        <Text
          style={{
            fontFamily: "Cairo",
            color: "#a7a7a7",
            fontSize: 14,
            textAlign: "right",
            marginHorizontal: 31,
            width: 331,
          }}
        >
          {
            "من خلال المتابعة، فإنك توافق على تلقي المكالمات أو رسائل واتساب أو الرسائل النصية، بما في ذلك الوسائل الآلية، من التطبيق والشركات التابعة له على الرقم المقدم."
          }
        </Text>
      </View>
      <View style={styles.circularButtonsContainer}>
        <TouchableOpacity
          style={styles.circularButton}
          onPress={() => handlePreviousClick()}
        >
          <Ionicons name="arrow-back" size={24} color="#9B9B9B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circularButton}
          onPress={() => {
            handleNextClick();
          }}
        >
          <Ionicons name="arrow-forward" size={24} color="#ECB7B7" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ECB7B7",
    marginBottom: 20,
    borderRadius: 17,
    paddingHorizontal: 10,
  },
  phoneNumberInput: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
    fontSize: 16,
  },
  countryPickerButton: {
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  countryPickerCloseButton: {
    width: 20,
    height: 20,
  },
  circularButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  circularButton: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderWidth: 2,
    borderColor: "#F2F2F2",
  },
});

export default Login;
