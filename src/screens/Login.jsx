import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { loginOrCreate } from "../utils/api";
import { storePlayer, getPlayer } from "../utils/storage";
import Title from "../components/Title";

import { PlayerContext } from "../providers/PlayerProvider";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [player, setPlayer] = useContext(PlayerContext);

  const savePlayer = (player) => {
    storePlayer(player)
      .then(() => {
        setPlayer(player);
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
    getPlayer().then((player) => {
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
    marginTop: 32,
    marginHorizontal: 18,
  },
  button: {
    marginTop: 12,
  },
});

export default LoginScreen;
