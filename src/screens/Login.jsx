import React, { useState, useEffect } from "react";
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
        <TextInput
          style={{ height: 40 }}
          placeholder="Login"
          onChangeText={(username) => setUsername(username)}
          defaultValue={username}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 16,
  },
});

export default LoginScreen;
