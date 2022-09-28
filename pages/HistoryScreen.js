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
  const read_checkin = async (key) => {
    try {
      var jsonValue = await AsyncStorage.getItem(key);
      setCheckin(JSON.parse(jsonValue));
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      //   alert("Error Read to storage:", e);
    }
  };
  const read_checkout = async (key) => {
    try {
      var jsonValue = await AsyncStorage.getItem(key);
      setCheckout(JSON.parse(jsonValue));
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      //   alert("Error Read to storage:", e);
    }
  };
  React.useEffect(() => {
    read_checkin("checkin");
    read_checkout("checkout");
  }, [checkin, checkout]);

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
              fontSize: 14,
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
              fontSize: 14,
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
