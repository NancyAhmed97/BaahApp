import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataArr, setDataArr] = useState({});
  const navigation = useNavigation();

  const goToSubscription = () => {
    navigation.navigate("Subscription");
  };

  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  // Example images
  const images = [
    require("./assets/1.png"),
    require("./assets/2.png"),
    require("./assets/3.png"),
    require("./assets/4.png"),
  ];
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.post(`https://marriage-application.onrender.com/login`,
        {
          "email" : "man9999@gmail.com", // email of the user
      
          "password": "man99" // password of the user
      
      
      });
      if (response.status === 200) {
        setDataArr(response.data)

      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>الحساب</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.profileRow}>
              <Image
                source={require("./assets/flag.png")}
                style={styles.profileImage}
              />
              <View style={styles.profileInfoContainer}>
                <Text style={styles.profileInfo}>{dataArr.name} </Text>
                <Text style={styles.profileDetails}>
                {dataArr.nationality}
                </Text>
                <Text style={styles.profileDetails}>اخر تواجد قبل                  {dataArr.active_status&&dataArr.active_status}
</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <Image
                  source={require("./assets/location.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Image
                  source={require("./assets/lastsean.png")}
                  style={{
                    width: 16,
                    height: 16,
                    marginBottom: -40,
                    marginLeft: -18,
                  }}
                />
                {/* Profile Picture */}
                <Image
                  source={require("./assets/pp.png")}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    borderWidth: 2,
                    borderColor: "#ffffff",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "#cccccc" }}
            />
            <View style={{ marginTop: 10 }}>
              <Text style={styles.profileDetails}>
                ابحث عن امرأة صادقة وتخاف الله، تحب الوناسة و العمل ومتفهمة و
                مرحة .
              </Text>
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text style={styles.editButton}>تعديل على ملفك</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.subscriptionContainer}>
          <Text style={styles.subscriptionText}>الباقة الحالية</Text>
        </View>
        <View style={styles.subscriptionOptionsContainer}>
          <TouchableOpacity
            onPress={goToSubscription}
            style={styles.subscriptionOption}
          >
            <Text style={styles.subscriptionOptionText}>مجانية</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subscriptionOption}>
            <Text style={styles.subscriptionOptionText}>باقة الاشتراك</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.impContainer}>
          <Text style={styles.additionalTitleText}>أساسيات</Text>
          <View style={styles.groupParent}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={styles.buttonText}>❤️ {dataArr.marital_status_woman_man}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={styles.buttonText}>🌙 {dataArr.religious_denomination}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={styles.buttonText}>                {dataArr.skin_woman_man}
</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={styles.buttonText}>{dataArr.height_woman}cm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={styles.buttonText}>{dataArr.weight_woman}kg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={styles.buttonText}>🚬 {dataArr.smoking_drinking_woman_man}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={styles.buttonText}> {dataArr.work_status_woman_man}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={[styles.buttonText,{fontSize:11}]}> {dataArr.need_kids_woman_man}👧</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.rectangle} />
              <Text style={styles.buttonText}>{dataArr.educational_level_woman_man}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.habitsContainer}>
          <Text style={styles.habitsText}>عاداتي</Text>
        </View>
        <View style={styles.groupParent}>
          {dataArr.daily_habits_woman&&dataArr.daily_habits_woman.map((item)=>{
           return(
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> {item}</Text>
          </TouchableOpacity>
           ) 
          })}
        </View>

        <View style={styles.galleryContainer}>
          <Text style={styles.galleryTitle}>صوري</Text>
          <View style={styles.galleryImagesContainer}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openImage(image)}
                style={styles.galleryImageContainer}
              >
                <Image source={image} style={styles.galleryImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {selectedImage && (
                <Image source={selectedImage} style={styles.fullSizeImage} />
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  accountContainer: {
    marginTop: 50,
    marginRight: 20,
    alignItems: "flex-end", // Aligns content to the right
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Ensures the row starts from the right
  },
  profileImage: {
    width: 23,
    height: 23,
    borderRadius: 5,
  },
  profileInfoContainer: {
    marginLeft: 65, // Adjust or remove based on your layout needs
  },
  profileInfo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  profileDetails: {
    fontSize: 12,
    color: "#666666",
  },
  profileImageLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileDescription: {
    marginTop: 10,
  },
  profileDescriptionText: {
    fontSize: 14,
    color: "#333333",
  },
  editButtonContainer: {
    marginTop: 10,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff4d4d",
    textAlign: "right", // Aligns button text to the right
  },
  subscriptionContainer: {
    marginTop: 20,
    marginRight: 20,
  },
  subscriptionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "right", // Aligns subscription text to the right
  },
  subscriptionOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  subscriptionOption: {
    width: "45%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333333",
    padding: 5,
    alignItems: "center",
  },
  subscriptionOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  impContainer: {
    marginRight: 20,
    marginTop: 20,
    alignItems: "flex-end", // Ensures "اساسيات" aligns to the right
  },
  additionalTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333", // Added color specification
    textAlign: "right", // Aligns text to the right
  },
  groupParent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    
  },
  button: {
    width: 110,
    height: 34,
    borderWidth: 1,
    borderColor: "#485868",
    borderRadius: 13,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 10,
    color: "pink",
  },
  habitsContainer: {
    marginRight: 20,
    marginTop: 20,
    alignItems: "flex-end", // Ensures "عاداتي" aligns to the right
  },
  habitsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333", // Added color specification
    textAlign: "right", // Aligns text to the right
  },
  galleryContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    width: "100%", // Adjusted for full width to accommodate gallery alignment
  },
  galleryTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333", // Added color specification
    marginBottom: 10,
    textAlign: "right", // Aligns gallery title to the right
  },
  addPhotosText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff4d4d", // Added color specification
    textAlign: "right", // Aligns "اضافة صور" text to the right
  },
  galleryImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // Aligns images to start from the right
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  galleryImageContainer: {
    width: "30%", // Adjust according to your layout preference
    marginBottom: 10,
  },
  galleryImage: {
    width: "100%",
    aspectRatio: 1, // Keeps the images square
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Adjust as needed
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  fullSizeImage: {
    width: 250, // Adjust to keep the image square
    height: 250, // Match width for square aspect ratio
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  galleryImageContainer: {
    width: "32%", // Making images smaller as per request
    marginBottom: 10,
  },
  galleryImage: {
    width: "100%",
    height: undefined, // Height is determined by aspect ratio
    aspectRatio: 1, // Keeps the image square
    borderRadius: 10,
  },
});

export default Profile;
