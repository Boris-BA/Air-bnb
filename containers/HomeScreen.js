import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
        <Button
          title="Go to Room"
          onPress={() => {
            navigation.navigate("Room", { Id: 123 });
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          height: 40,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="airbnb" size={40} color="red" />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          let stars = [];
          for (let i = 1; i < 6; i++) {
            // console.log(i);
            // console.log("hello" + item.ratingValue);
            if (i <= item.ratingValue) {
              // console.log("jaune");
              stars.push(
                <Entypo name="star" size={24} color="orange" key={i} />
              );
            } else {
              // console.log("noir");
              stars.push(<Entypo name="star" size={24} color="grey" key={i} />);
            }
          }
          // console.log(stars);
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Room", { roomId: item._id, id: "123" });
              }}
            >
              <View
                style={{
                  backgroundColor: "bisque",
                  height: 260,
                  marginBottom: 10,
                }}
              >
                <Image
                  style={{ height: 200 }}
                  source={{ uri: item.photos[0].url }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{ backgroundColor: "grey", height: 65, width: 300 }}
                  >
                    <Text
                      style={{ height: 30, fontSize: 20 }}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {item.description}
                    </Text>
                    <View
                      style={
                        {
                          // display: "flex",
                          // flexDirection: "row",
                        }
                      }
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          height: 20,
                          backgroundColor: "red",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flex: 2,
                            backgroundColor: "red",
                          }}
                        >
                          {stars}
                          {/* <FontAwesome name="star-o" size={24} color="black" />
                        <FontAwesome name="star-o" size={24} color="black" />
                        <FontAwesome name="star-o" size={24} color="black" />
                        <FontAwesome name="star-o" size={24} color="black" />
                        <FontAwesome name="star-o" size={24} color="black" />
                        <Text>{item.ratingValue}</Text> */}
                        </View>

                        <Text
                          style={{
                            // flex: 1,
                            backgroundColor: "blue",
                          }}
                        >
                          {item.reviews} reviews
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "orange",
                      height: 65,
                      width: 65,
                    }}
                  >
                    <Image
                      style={{ height: "100%" }}
                      source={{ uri: item.user.account.photo.url }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    padding: 10,
                    bottom: 70,
                  }}
                >
                  <Text style={{ color: "white" }}> {item.price} €</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </KeyboardAwareScrollView>
  );
}
