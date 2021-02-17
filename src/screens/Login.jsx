import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { loginOrCreate } from "../utils/api";
import { storePlayer, getPlayerFromStorage } from "../utils/storage";
import Title from "../components/Title";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const savePlayer = (player) => {
    storePlayer(player)
      .then(() => {
        navigation.navigate("Home", { player });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleLogin = () => {
    loginOrCreate(username)
      .then((res) => {
        savePlayer(res.data);
      })
      .catch((e) => {
        console.error(e);
        Alert.alert("Login doesn't works");
      });
  };

  useEffect(() => {
    getPlayerFromStorage().then((player) => {
      if (player && player.id) {
        navigation.navigate("Home", { player });
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title>Login to play !</Title>
        <TextInput
          label="Login"
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Connect
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "2rem",
    marginHorizontal: "4rem",
  },
  button: {
    marginTop: "2rem",
  },
});

export default LoginScreen;
