import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import stylesheet from "../stylesheet/style";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import axios from "axios";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [textArea, setTextArea] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log(errorMessage);
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white", display: "flex", flex: 1 }}
    >
      {/* style={{ backgroundColor: "blue" }} */}
      <View>
        <View
          style={{
            display: "flex",
            height: 300,
            // backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="airbnb" size={100} color="red" />
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>Sign in</Text>
        </View>
        {errorMessage && (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "red",
              marginHorizontal: 60,
              marginBottom: 20,
            }}
          >
            {errorMessage}
          </Text>
        )}

        <Text style={stylesheet.label}>Email: </Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={stylesheet.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text>{email}</Text>
        <Text style={stylesheet.label}>Username: </Text>
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={stylesheet.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <Text>{username}</Text>
        <Text style={stylesheet.label}>Describe:</Text>
        <TextInput
          multiline={true}
          textAlignVertical="top"
          numberOfLines={4}
          placeholder="Describe yourself in few words..."
          style={stylesheet.textArea}
          onChangeText={(text) => {
            setTextArea(text);
          }}
        />
        <Text>{textArea}</Text>

        <Text style={stylesheet.label}>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={stylesheet.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Text>{password}</Text>
        <Text style={stylesheet.label}>Confirm Password: </Text>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={stylesheet.input}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
        />
        <Text>{confirmPassword}</Text>

        <Pressable
          style={stylesheet.button}
          onPress={async () => {
            // const data = { email: "nono@airbnb-api.com", password: "pass" };
            const data = {
              email: email,
              username: username,
              description: textArea,
              password: password,
            };
            setErrorMessage("");
            if (email && username && textArea && password && confirmPassword) {
              console.log("True");

              if (password === confirmPassword) {
                console.log("Oui");
                try {
                  const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/sign_up",
                    data
                  );
                  console.log(response.data);
                  console.log(response.data.token);
                  const userToken = response.data.token;
                  setToken(userToken);

                  console.log(response);
                  if (response.status === 200) {
                    alert("Inscription réussi");
                  }
                } catch (error) {
                  // console.log(error.message);
                  // console.log(error.response);
                  console.log(error.response.data.error);
                  console.log(error.response.status);
                  if (error.response?.status === 400) {
                    setErrorMessage(error.response.data.error);
                  }
                }
              } else {
                console.log("Non");
                setErrorMessage(
                  "Password and Confirm Password must be indentical"
                );
              }
            } else {
              console.log("Faux");
              setErrorMessage("Missings parameters");
            }
          }}
        >
          <Text>Sign Up</Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
