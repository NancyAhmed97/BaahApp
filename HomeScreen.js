import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import SwipeCards from "react-native-swipe-cards";
import Icon from "react-native-vector-icons/EvilIcons";
import { useFavorites } from "./FavoritesContext";
import axios from "axios";

const { width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    name: "شوق محمد",
    location: "الرياض, المملكة العربية السعودية",
    image: require("./assets/g.jpg"),
    lastSeen: "اخر اتصال قبل دقيقتين",
    lastSeenIcon: "clock",
  },
  {
    id: 2,
    name: "فيصل ابراهيم",
    location: "الرياض, المملكة العربية السعودية",
    image: require("./assets/visibility.jpg"),
    lastSeen: "اخر تواجد قبل دقيقتين",
    lastSeenIcon: "clock",
  },
  {
    id: 3,
    name: "ناديه صالح",
    location: "اليمن",
    image: require("./assets/girltt.jpg"),
    lastSeen: "اخر تواجد قبل 8 دقائق",
    lastSeenIcon: "clock",
  },
];

const Card = ({ card, toggleFavorite, isFavorite }) => (
  <View style={styles.card}>
    <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
      <Image
        source={ require("./assets/visibility.jpg")}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <View style={{ flex: 1, alignItems: "flex-end", marginRight: 10 }}>
        <Text style={styles.name}>{card.name}</Text>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Icon name="location" size={20} />
          <Text style={styles.detailText}>{card.nationality}</Text>
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Icon name='clock' size={20} />
          <Text style={styles.detailText}>{card.active_status}</Text>
        </View>
      </View>
    </View>
    <View style={styles.separator} />
    <Text style={styles.description}>
      ابحث عن رجل صادق ويخاف الله، يحب الوناسة والعمل ومتفهم ومرح ويكون مسؤول عن
      نفسه للزواج.
    </Text>
    <View style={styles.infoBoxContainer}>{/* Info buttons... */}</View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.gradientButton, styles.messageButton]}>
        <Icon name="envelope" size={30} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.gradientButton, styles.favoriteButton]}
        onPress={async() => {
          toggleFavorite(card.id)
          try {
            const response = await axios.post(`https://marriage-application.onrender.com/addtofav?id=65ea314b30e0bf5251a69ee4&favId=${card.id}`);
            if (response.status === 200) {
              console.log("response",response.data);
        
            }
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        
        }
      
      }
      >
        <Icon
          name="star"
          size={30}
          style={[styles.icon, { color: isFavorite ? "#ECB7B7" : "white" }]} // Directly apply color change here
        />
      </TouchableOpacity>
    </View>
    <View style={styles.infoBoxContainer}>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.need_kids_woman_man}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.educational_level_woman_man}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.marital_status_woman_man}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.smoking?'تدخن':'لا تدخن'} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.religious_commitment_woman_man}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.skin_woman_man}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.weight_woman}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.height_woman}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{card.work_status_woman_man}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const NoMoreCards = () => (
  <View style={styles.noMoreCards}>
    <Text style={styles.noMoreCardsText}>لا توجد بطاقات أخرى</Text>
  </View>
);

const HomeScreen = () => {
  const { favorites, toggleFavorite } = useFavorites(); // Correctly use useFavorites
  const [userData, setUserData] = useState([]);


useEffect(() => {

  fetchData()

}, [])
const fetchData =async () => {
  try {
    const response = await axios.post('https://marriage-application.onrender.com/getall?gender=female');
    if (response.status === 200) {
      console.log(response.data);
      setUserData(response.data);

    }
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}
  return (
    <View style={styles.container}>
      <SwipeCards
        cards={userData&&userData}
        renderCard={(cardData) => (
          <Card
            card={cardData}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(cardData.id)}
          />
        )}
        renderNoMoreCards={() => <NoMoreCards />}
        useNativeDriver={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECB7B7",
    paddingBottom: 20, // Add padding to the bottom
  },
  card: {
    width: width * 0.88,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 90, // Add margin to the bottom
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FFF",
    marginTop: -40, // Adjust as needed to position correctly within card
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameContainer: {
    marginLeft: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 5,
  },
  detailText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "right",
  },
  icon: {
    marginRight: 5,
    color: "white",
  },

  lastSeenContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5, // Adjust as needed
  },
  lastSeen: {
    fontSize: 16,
    color: "#666",
    textAlign: "right", // Align text to the right
  },
  lastSeenIconContainer: {
    marginRight: 5, // Add margin to the icon container
  },
  lastSeenIcon: {
    color: "#666",
  },
  imageContainer: {
    width: 85,
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 42.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  profileImage: {
    top: -50,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: "#666",
  },
  placeholderText: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    textAlign: "center",
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#ECB7B7",
    marginVertical: 10,
  },
  infoBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  infoButton: {
    paddingHorizontal: 8, // Reduced padding to bring buttons closer
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#485868",
    borderWidth: 1,
    marginHorizontal: 2, // Reduced margin to bring buttons closer
    marginVertical: 5,
  },
  infoButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#485868",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: "absolute", // Position the container absolutely to allow positioning outside of the card
    bottom: -50, // Move the container up to make buttons appear outside
    left: 0, // Align with the left edge of the card
    right: 0, // Align with the right edge of the card
    alignItems: "center", // Center the buttons horizontally
  },
  messageButton: {
    backgroundColor: "#485868",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 12,
    shadowColor: "#ECB7B7",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  favoriteButton: {
    backgroundColor: "#485868",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 12,
    shadowColor: "#ECB7B7",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  favoriteActive: {
    backgroundColor: "#ECB7B7", // Active favorite background color
  },
  icon: {
    color: "white",
  },
  gradientButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  noMoreCards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMoreCardsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  description: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export const profileData = data; // Export data if needed elsewhere
export default HomeScreen;
