import { useRoute } from "@react-navigation/core";
import { Text, View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

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
  }, [id]);
  // console.log(data?._id);
  return (
    <View>
      <Text>Room</Text>
      <Text>user id : {params.roomId}</Text>
      <Text>id : </Text>
      <Text>{!isLoading && data._id}</Text>
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
