import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Application from 'expo-application';
import axios from "axios";
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [gateId, setGateId] = useState(null);
  const [scanned, setScanned] = useState(false);
  const urlScan =
    "https://expressjs-prisma-production-0a4e.up.railway.app/scans";
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // setGateId(data)
    const data_tosubmit = {
      deviceId: Application.androidId,
      gateId: data,
    };
    if (data) {
      axios
        .post(urlScan, data_tosubmit)
        .then(function (response) {
          alert("Success");
          console.log(response);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
