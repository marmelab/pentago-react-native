import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Button, Text, FlatList } from "react-native";

import { joinGame } from "../utils/api";
import { player } from "../utils/storage";

const GameItem = ({ game, navigation }) => {
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
      <Text>{game.id}</Text>
      <Button title="Join" onPress={handleJoinGame} />
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
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={(game) => game.id}
    />
  );
};

export default GameList;
