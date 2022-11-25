import { Text, View } from "react-native";

export default function ProfileScreen({
  setId,
  setToken,
  userId,
  userToken,
  a,
}) {
  console.log(userId);
  console.log(userToken);
  console.log(a);

  return (
    <View>
      <Text>Profil: {userId} </Text>
      {/* <Text>user id : {params}</Text> */}
    </View>
  );
}
