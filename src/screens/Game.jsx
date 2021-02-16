import React, { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";

import { getGame } from "../utils/api";

const GameScreen = ({ navigation, route }) => {
  const [game, setGame] = useState();

  useEffect(() => {
    const handleGetGame = (id) => {
      getGame(id)
        .then((res) => {
          setGame(res.data);
        })
        .catch((e) => {
          console.error(e);
          Alert.alert("Game not found");
        });
    };

    handleGetGame(route.params.id);

    const interval = setInterval(() => {
      handleGetGame(route.params.id);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [route.params.id]);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {game && (
          <>
            {game.player1 && game.player2 ? (
              <>
                <Text>Welcome both !</Text>
                <Text>
                  {game.player1.name} & {game.player2.name}
                </Text>
              </>
            ) : (
              <Text>You are alone on {game.id}</Text>
            )}
          </>
        )}
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

export default GameScreen;
