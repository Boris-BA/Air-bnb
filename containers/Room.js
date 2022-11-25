import { useRoute } from "@react-navigation/core";
import { Text, View, FlatList, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import Swiper from "react-native-swiper";

export default function Room() {
  const { params } = useRoute();

  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const id = params.roomId;
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
          // console.log(
          //   `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
          // )
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
  // console.log(data?._id);
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>RoomId : {params.roomId}</Text>
          <Image style={{ height: 200 }} source={{ uri: data.photos[0].url }} />
          <ScrollView>
            <Swiper
              style={{ height: 300 }}
              dotColor="salmon"
              activeDotColor="red"
              autoplay
            >
              {data.photos.map((slide, index) => {
                return (
                  <View>
                    <Image
                      key={index}
                      source={{ uri: slide.url }}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </View>
                );
              })}
            </Swiper>
          </ScrollView>
        </View>
      )}

      {/* <Text>Room</Text>
      <Text>user id : {params.roomId}</Text>
      <Text>id : </Text>
      {isLoading && <ActivityIndicator />}
      {!isLoading && (
        <Image style={{ height: 200 }} source={{ uri: data.photos[0].url }} />
      )} */}

      {/* <Text>{!isLoading && data._id}</Text> */}
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          console.log(item.user.account.username);
          return (
            <View>
              <Text>{item._id}</Text>
            </View>
          );
        }}
      /> */}
    </View>
  );
}
