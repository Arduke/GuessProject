import React from 'react';
import { View,Text, StyleSheet, ImagePropTypes } from 'react-native';

const BodyText = (props) => {
  return (
        <View style={{padding:10, alignContent: 'center', alignItems: 'center'}}>
            <Text {...props} style={styles.font}>{props.children}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    font: {
        fontFamily: "open-sans-bold",
        fontSize: 18
    }
})
export default BodyText;