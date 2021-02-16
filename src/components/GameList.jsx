import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FlatList, View, StyleSheet } from "react-native";

import { Button, Divider, Title, Caption, useTheme } from "react-native-paper";

import { joinGame } from "../utils/api";
import { player } from "../utils/storage";

const GameItem = ({ game, navigation }) => {
  const { colors } = useTheme();
  const handleJoinGame = () => {
    joinGame(game.id, player.id)
      .then(() => {
        navigation.navigate("Game", { id: game.id });
      })
      .catch((e) => {
        console.error(e);
        Alert.alert("Canno't join game");
      });
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <View style={styles.itemTitles}>
          <Title>Play with {game.player1.name}</Title>
          <Caption>
            Created {new Date(game.created.timestamp).toLocaleString()}
          </Caption>
        </View>
        <Button
          title="Join"
          onPress={handleJoinGame}
          color={colors.secondary}
          style={styles.button}
        >
          Join
        </Button>
      </View>
      <Divider />
    </>
  );
};

const GameList = ({ games }) => {
  const navigation = useNavigation();
  // navigation hook cann'ot be called inside GameItem due to FlatList component mounting.
  // Instead, use a proxy function to handle this properly
  const renderItem = ({ item }) => (
    <GameItem game={item} navigation={navigation} />
  );

  return (
    <View>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(game) => game.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 8,
    marginHorizontal: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  itemTitles: {
    textAlign: "center",
    width: "50%",
  },
  button: {
    width: "50%",
  },
});

export default GameList;
