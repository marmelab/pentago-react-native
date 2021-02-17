import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { FlatList, View, StyleSheet, Alert } from "react-native";

import { Button, Divider, Title, Caption, useTheme } from "react-native-paper";

import { format, fromUnixTime } from "date-fns";

import { joinGame } from "../utils/api";
import { PlayerContext } from "../providers/PlayerProvider";

const GameItem = ({ game, navigation }) => {
  const [player] = useContext(PlayerContext);
  const { colors } = useTheme();
  const handleJoinGame = () => {
    joinGame(game.id, player.id)
      .then(() => {
        navigation.navigate("Game", { id: game.id });
      })
      .catch((e) => {
        console.error(e);
        Alert.alert("Can't join game");
      });
  };

  return (
    <>
      <View style={styles.itemContainer}>
        <View style={styles.itemTitles}>
          <Title>Play with {game.player1.name}</Title>
          <Caption>
            Created{" "}
            {format(fromUnixTime(game.created.timestamp), "dd/MM/yyyy HH:mm")}
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
