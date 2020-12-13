import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput  } from 'react-native';
import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen'
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AppLoading  from 'expo-app-loading'



export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  const startGameHandle = (selectedNumber) => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame = {startGameHandle} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen onGameOver={gameOverHandler} userChoice={userNumber}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
    
  }
});
