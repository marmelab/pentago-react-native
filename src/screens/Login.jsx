import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";

import { loginOrCreate } from "../utils/api";
import { storePlayer, getPlayerFromStorage } from "../utils/storage";
import Title from "../components/Title";

import { PlayerContext } from "../providers/PlayerProvider";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [player, setPlayer] = useContext(PlayerContext);

  const savePlayer = (player) => {
    storePlayer(player)
      .then((res) => {
        setPlayer(res.data);
        navigation.navigate("Home");
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
        setPlayer(player);
        navigation.navigate("Home");
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
