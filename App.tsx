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

const App = () => {
  const [leftCards] = useState<Array<string>>(cards);

  const speechCard = () => {
    const card = leftCards[0];
    Speech.speak(card, { language: "JA-jp" });
  };

  return (
    <View style={styles.container}>
      <Button onPress={speechCard} title="つぎへ" />
    </View>
  );
};

export default App;
