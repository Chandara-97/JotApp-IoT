// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Application from "expo-application";
import axios from "axios";
import { baseURL } from "../env";
import { wirte, read } from "../libs/storage";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "./../libs/navigationService";

const HomeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const urlScan = `${baseURL}/scans`;
  const [checkin, setCheckin] = React.useState(null);
  const [checkout, setCheckout] = React.useState(null);
  const read = async (key) => {
    try {
      var jsonValue = await AsyncStorage.getItem(key);
      setCheckin(jsonValue ?? null);
      setCheckout(jsonValue ?? null);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      //   alert("Error Read to storage:", e);
    }
  };
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
    read("checkin");
    read("checkout");
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const data_tosubmit = {
      deviceId: Application.androidId,
      gateId: data,
    };
    const dateTimeFomart = moment().format("MMMM Do YYYY - h:mm:ss a");
    if (data) {
      axios
        .post(urlScan, data_tosubmit)
        .then(function (response) {
          if (!checkin) {
            wirte("checkin", dateTimeFomart);
            navigation.navigate("SettingsStack");
          }
          if (checkin && !checkout) {
            wirte("checkout", dateTimeFomart);
            navigation.navigate("SettingsStack");
          }
          alert("Success:", dateTimeFomart);
          console.log(response);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  if (hasPermission === null) {
    //   return <Text>Requesting for camera permission</Text>;
    return <ActivityIndicator size={32} />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default HomeScreen;
