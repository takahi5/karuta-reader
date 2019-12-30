import React, { useState, useRef } from "react";
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
  const currentCardRef = useRef("");
  const timerRef = useRef();

  const repeat = () => {
    console.log(currentCardRef.current);
    //Speech.speak(card, { language: "JA-jp" });
    timerRef.current = setTimeout(repeat, 3000);
  };

  const speechCard = () => {
    clearTimeout(timerRef.current);
    if (currentCardRef.current) {
      setFinishedCards([...finishedCards, currentCardRef.current]);
    }

    const rand = getRandomInt(leftCards.length);
    const card = leftCards[rand];
    currentCardRef.current = card;
    //Speech.speak(card, { language: "JA-jp" });
    console.log(rand, card);

    setLeftCards(
      leftCards.filter((card, index) => {
        return index !== rand;
      })
    );
    timerRef.current = setTimeout(repeat, 10000);
  };

  const reset = () => {
    clearTimeout(timerRef.current);
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
