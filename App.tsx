import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Speech from "expo-speech";
import cards from "./data/card.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

const App = () => {
  const [leftCards, setLeftCards] = useState<Array<string>>(cards);
  const [finishedCards, setFinishedCards] = useState<Array<string>>([]);

  const speechCard = () => {
    const rand = getRandomInt(leftCards.length);
    const card = leftCards[rand];
    console.log(rand, card);
    //Speech.speak(card, { language: "JA-jp" });

    setLeftCards(
      leftCards.filter((card, index) => {
        return index !== rand;
      })
    );
    setFinishedCards([...finishedCards, card]);
  };

  const reset = () => {
    setLeftCards(cards);
  };

  return (
    <View style={styles.container}>
      <Button onPress={speechCard} title="つぎへ" />
      <Text>
        {leftCards.length}/{cards.length}
      </Text>
      <Button onPress={reset} title="リセット" />
    </View>
  );
};

export default App;
