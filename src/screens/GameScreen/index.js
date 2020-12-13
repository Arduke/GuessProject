import React, {useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native'
import NumberContainer from '../../components/NumberContainer'
import Card from '../../components/Card'
import { Ionicons } from '@expo/vector-icons'
import MainButton from '../../components/MainButton'
import BodyText from '../../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (value, numOfRunds) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{numOfRunds}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    )
}

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const {userChoice, onGameOver} = props;


    useEffect(( )=> {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)
        ){
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong ...',
                [{text:'Sorry!', style: 'cancel'}])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber)
        //setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber,... curPastGuesses])
    }


    return (
        <View style={styles.screen}>
            <BodyText> Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name='md-remove' size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this,'greater')}>
                    <Ionicons name='md-add' size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20,
        width: 350,
        maxWidth: '80%'
    },
    button: {
        width: 100,
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
    ,
    listItem: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    }
})

export default GameScreen;