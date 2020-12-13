import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import BodyText from '../../components/BodyText'
import Card from '../../components/Card'
import FinishedPng from '../../../assets/images/undraw_completed.png'
import colors from '../../constants/colors';
import MainButton from '../../components/MainButton';

const GameOverScreen = (props) => {
  return (
      <View style={styles.screen}>
          <Card style={{width: '90%', height: '90%'}}>
            <BodyText>The Game is Over!</BodyText>
            <Image resizeMode="center" style={styles.image} source={FinishedPng}/>
            <BodyText>Your phone needed <Text style={styles.text}>{props.roundsNumber}</Text> rounds to guess number <Text style={styles.text}>{props.userNumber}</Text></BodyText>
            <View style={{width: '100%', borderRadius: 30}}>
            <MainButton  onPress={()=> props.onRestart()}>NEW GAME</MainButton>
            </View>
          </Card>
      </View>
  )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width:'100%',
        height: '65%'
    },
    text: {
        color: colors.primary
    }
})
export default GameOverScreen;