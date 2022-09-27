// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { read } from "../libs/storage";

const width = Dimensions.get("screen").width;
const hieght = Dimensions.get("screen").height;

const HistoryScreen = () => {
  const [checkin, setCheckin] = React.useState(null);
  const [checkout, setCheckout] = React.useState(null);
  React.useEffect(() => {
    read("checkin");
    read("checkout");
  }, []);
  const read = async (key) => {
    try {
      var jsonValue = await AsyncStorage.getItem(key);
      setCheckin(jsonValue ?? null);
      setCheckout(jsonValue ?? null);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      alert("Error Read to storage:", e);
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 16,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 32,
          }}
        >
          Check in:
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {checkin ? checkin : ""}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 32,
          }}
        >
          Check Out:
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {checkout ? checkout : ""}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default HistoryScreen;
