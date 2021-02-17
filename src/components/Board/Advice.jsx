import React, { useContext, useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Paragraph } from "react-native-paper";

import { getAdvice } from "../../utils/api";
import { PlayerContext } from "../../providers/PlayerProvider";
import { ADD_MARBLE_STATUS } from "../../constants/game";

const Advice = ({ gameId, gameState }) => {
  const [player] = useContext(PlayerContext);
  const [visible, setVisible] = useState(false);
  const [advice, setAdvice] = useState(null);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    if (gameState === ADD_MARBLE_STATUS) {
      getAdvice(gameId, player.id).then((res) => {
        setAdvice(res.data);
      });
    } else {
      setAdvice(null);
    }
  }, [setAdvice, gameId, gameState, player]);
  return (
    <View style={styles.container}>
      {advice && gameState == ADD_MARBLE_STATUS && (
        <>
          <Button onPress={showDialog}>Hint</Button>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Best move for you :</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  You should place a marble on {advice.PlaceMarble[0]},{" "}
                  {advice.PlaceMarble[1]} then rotate the quarter{" "}
                  {parseInt(advice.Rotate[0]) + 1} in {advice.Rotate[1]}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
});

export default Advice;
