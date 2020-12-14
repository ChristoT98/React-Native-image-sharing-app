import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/logo.png';

export default function App() {
  return (
    <View style={styles.container}>

        {/*Displaying the image in the app*/}
        {/*<Image source={logo} style={{ width: 305, height: 159 }} />*/}

        {/*Loading images by URL*/}
        {/*<Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={{ width: 305, height: 159 }} />*/}

        {/*Add inline styles to text tag*/}
        {/*<Text style={{color: '#888', fontSize: 18}}>
            To share a photo from your phone with a friend, just press the button below!
        </Text>*/}

        {/*Add internal styles to text tag*/}
        <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={ styles.logo } />

        {/*Add internal styles to text tag*/}
        <Text style={ styles.instructions }>
            To share a photo from your phone with a friend, just press the button below!
        </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
    },
    instructions:{
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
    },
});
