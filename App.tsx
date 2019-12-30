import React, { useState, useRef } from "react";
import { StyleSheet, FlatList, SafeAreaView, Alert } from "react-native";
import * as Speech from "expo-speech";
import cards from "./data/card.json";
import Header from "./components/Header";
import PlayButton from "./components/PlayButton";
import ResetButton from "./components/ResetButton";
import ListItem from "./components/ListItem";

const REPEAT_INTERVAL = 10000;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

const App = () => {
  const [leftCards, setLeftCards] = useState<Array<string>>(cards);
  const [finishedCards, setFinishedCards] = useState<Array<string>>([]);
  const currentCardRef = useRef<string>("");
  const timerRef = useRef<number>();

  const repeat = () => {
    //console.log(currentCardRef.current);
    Speech.speak(currentCardRef.current, { language: "JA-jp" });
    timerRef.current = setTimeout(repeat, REPEAT_INTERVAL);
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setLeftCards(cards);
    setFinishedCards([]);
    currentCardRef.current = "";
  };

  const onPressNext = () => {
    clearTimeout(timerRef.current);
    if (currentCardRef.current) {
      setFinishedCards([currentCardRef.current, ...finishedCards]);
    }

    const rand = getRandomInt(leftCards.length);
    const card = leftCards[rand];
    currentCardRef.current = card;
    //console.log(rand, card);
    Speech.speak(card, { language: "JA-jp" });

    setLeftCards(
      leftCards.filter((card, index) => {
        return index !== rand;
      })
    );
    timerRef.current = setTimeout(repeat, REPEAT_INTERVAL);
  };

  const onPressReset = () => {
    Alert.alert(
      "リセット",
      "リセットしますか?",
      [
        { text: "キャンセル", style: "cancel" },
        { text: "OK", onPress: () => reset() }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${leftCards.length}/${cards.length}`} />
      <FlatList
        data={finishedCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ListItem text={item} />}
      />
      <PlayButton onPress={onPressNext} />
      <ResetButton onPress={onPressReset} />
    </SafeAreaView>
  );
};

export default App;
