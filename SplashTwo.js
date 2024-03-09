import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const SplashScreens = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const splashData = [
    {
      title: "مرحبا بك في باءة",
      subtitle: "توحيد القلوب، تكريم الإيمان: شريكك في رحلات الحب الحلال",
    },
    {
      title: "التوافق على أساس المبادئ الإسلامية",
      subtitle: "قم بمطابقة المستخدمين على أساس القيم الدينية وأسلوب الحياة.",
    },
    {
      title: "الخصوصية هي مشغلنا الرئيسي",
      subtitle: "اكشف عن صورك لتتوافق مع شريك حياتك",
    },
    {
      title: "ابحث عن شريك حياتك المسلم",
      subtitle: "ستطابقك خوارزميتنا الذكية مع شريكك المسلم",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % splashData.length;
        scrollViewRef.current.scrollTo({
          x: width * nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const onSkipPress = () => {
    navigation.navigate("Login");
  };

  const onContinuePress = () => {
    const nextIndex = (currentIndex + 1) % splashData.length;
    scrollViewRef.current.scrollTo({ x: width * nextIndex, animated: true });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ECB7B7" barStyle="light-content" />
      <TouchableOpacity style={styles.skipButton} onPress={onSkipPress}>
        <Text style={styles.skipText}>تخطي</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.floor(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        ref={scrollViewRef}
      >
        {splashData.map((item, index) => (
          <View style={[styles.slide, { width }]} key={index}>
            <View style={styles.whiteBackground}>
              <Text style={styles.welcomeText}>{item.title}</Text>
              <Text style={styles.subtitleText}>{item.subtitle}</Text>
            </View>
            {currentIndex === index && (
              <TouchableOpacity
                style={styles.continueButton}
                onPress={onContinuePress}
              >
                <Text style={styles.buttonText}>متابعة</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {splashData.map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[
              styles.dot,
              currentIndex === dotIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECB7B7",
  },
  skipButton: {
    position: "absolute",
    right: 30,
    top: 46,
    zIndex: 5,
  },
  skipText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Cairo",
    fontWeight: "400",
  },
  whiteBackground: {
    position: "absolute",
    width: "100%",
    height: "60%",
    top: 300,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: "35%", // This is an estimated position; adjust according to your layout
    width: "100%",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 9999,
    margin: 5,
  },
  dotActive: {
    backgroundColor: "#ECB7B7",
  },
  dotInactive: {
    backgroundColor: "#EEEEEE",
  },
  welcomeText: {
    color: "#4B5867",
    fontSize: 28,
    fontFamily: "Cairo",
    fontWeight: "700",
    lineHeight: 34,
    marginTop: 20,
    textAlign: "center", // Center the text horizontally
  },
  subtitleText: {
    color: "#AAAAAA",
    fontSize: 16,
    fontFamily: "Cairo",
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 10,
    textAlign: "center", // Center the text horizontally
  },
  continueButton: {
    position: "absolute",
    bottom: 20, // Adjust if necessary for better positioning
    backgroundColor: "#ECB7B7",
    borderRadius: 20,
    padding: 10,
    // Increase padding horizontally to make the button wider
    paddingHorizontal: 40, // Increased from 30 to 40 for a wider button
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "Cairo",
    fontWeight: "600",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreens;
