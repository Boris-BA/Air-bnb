import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import axios from "axios";

const arrayOfMarkers = [
  {
    latitude: 48.8529371,
    longitude: 2.3500501,
    title: "Notre Dame",
    description: "Notre Dame",
  },
  {
    latitude: 48.8582602,
    longitude: 2.2944991,
    title: "Tour Eiffel",
    description: "Tour Eiffel",
  },
];

export default function AroundMe({ setToken }) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [loadingAxios, setIsLoadingAxios] = useState(true);
  const [data, setData] = useState();

  //   console.log(coords);
  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
      } else {
        setError(true);
      }

      setIsLoading(false);
    };

    askPermission();
  }, []);

  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoadingAxios(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Permission refusée</Text>
      ) : (
        <>
          {/* <Text>Latitude de l'utilisateur : {coords.latitude}</Text>
          <Text>Longitude de l'utilisateur : {coords.longitude}</Text> */}
          <View style={styles.container}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              {arrayOfMarkers.map((marker) => {
                return (
                  <Marker
                    key={marker.latitude}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    title={marker.title}
                    description={marker.description}
                  />
                );
              })}
            </MapView>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: 500,
    width: "100%",
  },
});
