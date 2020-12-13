import React, {useState} from 'react'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import Card from '../../components/Card'
import Input from '../../components/Input'
import MainButton from '../../components/MainButton'
import NumberContainer from '../../components/NumberContainer'
import Colors from '../../constants/colors'


const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('')

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    };

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!', 
                'Number has to be a number between 1 and 99', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            
            return;
        }
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        setConfirmed(true)
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if( confirmed ) {
        confirmedOutput = (
            <Card style={styles.summaryContent}>
                <Text>You Selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={()=> props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
        )
    }

    return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss()}}>
      <View style={styles.screen}>
          <Text style={styles.title}>The Game Screen!</Text>
          <Card style={styles.inputContainer}> 
              <Text style={{fontFamily: "open-sans-bold"}}> Select a Number</Text>
              <Input 
                style={styles.input} 
                blurOnSubmit 
                autoCapitalize='none'
                autoCorrect={false} 
                keyboardType="number-pad" 
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <Button  title="Reset" color={Colors.accent} onPress={resetInputHandler}/>
                  </View>
                  <View style={styles.button}>
                    <Button  title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/>
                  </View>
              </View>
          </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold"
    },
    inputContainer: {
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,  
    },
    input: {
        width: 30,
        textAlign: 'center'
    },
    summaryContent: {
        marginTop: 20,
        alignItems: 'center'
    },
})

export default StartGameScreen;