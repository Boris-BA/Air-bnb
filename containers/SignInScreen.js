import { useNavigation } from "@react-navigation/core";
import { FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import stylesheet from "../stylesheet/style";
import { useState } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

const SignInScreen = ({ setToken }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState();

  const [viewPassword, setViewPassword] = useState(false);
  console.log(errorMessage);
  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={{ marginTop: 100 }}
        />
      ) : (
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

            <Text style={stylesheet.label}>Name: </Text>
            <TextInput
              placeholder="Username"
              style={stylesheet.input}
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <Text>{email}</Text>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={stylesheet.label}>Password: </Text>
              <TextInput
                placeholder="Password"
                secureTextEntry={viewPassword === true ? false : true}
                style={stylesheet.input}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <FontAwesome
                onPress={() => {
                  setViewPassword(!viewPassword);
                  // console.log(viewPassword);
                }}
                name="eye"
                size={24}
                color="black"
              />
            </View>
            <Text>{password}</Text>

            <Pressable
              style={stylesheet.button}
              onPress={async () => {
                // const data = { email: "nono@airbnb-api.com", password: "pass" };
                const data = { email: email, password: password };
                setErrorMessage("");
                try {
                  setIsLoading(true);
                  const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    data
                  );
                  if (response.data) {
                    setIsLoading(false);
                  }
                  console.log(response.data);
                  console.log(response.data.token);
                  const userToken = response.data.token;
                  setToken(userToken);
                } catch (error) {
                  // console.log(error.message);
                  // console.log(error.response);
                  // console.log(error.response.data.error);
                  // console.log(error.response.status);
                  if (error.response?.status === 401) {
                    setErrorMessage("Mot de passe ou Email invlide");
                  }
                  if (error.response?.status === 400) {
                    setErrorMessage("Missing parameters");
                  }
                  if (error.response) {
                    setIsLoading(false);
                  }
                }
              }}
            >
              <Text>Sign in</Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Text>Create an account</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};
export default SignInScreen;
