import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  SafeAreaView
} from "react-native";
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
  const [currentCard, setCurrentCard] = useState();

  const speechCard = () => {
    if (currentCard) {
      setFinishedCards([...finishedCards, currentCard]);
    }

    const rand = getRandomInt(leftCards.length);
    const card = leftCards[rand];
    setCurrentCard(card);
    console.log(rand, card);
    //Speech.speak(card, { language: "JA-jp" });

    setLeftCards(
      leftCards.filter((card, index) => {
        return index !== rand;
      })
    );
  };

  const reset = () => {
    setLeftCards(cards);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        {leftCards.length}/{cards.length}
      </Text>
      <FlatList
        data={finishedCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <Button onPress={speechCard} title="つぎへ" />
      <Button onPress={reset} title="リセット" />
    </SafeAreaView>
  );
};

export default App;
