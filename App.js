import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files'

export default function App() {
    const [selectedImage, setSelectedImage] =React.useState(null);

    /*Request permission to access gallery*/
    /*let openImagePickerAsync = async ()=>{
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted === false){
            alert("Permission to access gallery is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true){
            return;
        }
        setSelectedImage({localUri: pickerResult.uri});
    };*/

    /*Request permission to access gallery*/
    let openImagePickerAsync = async ()=>{
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted === false){
            alert("Permission to access gallery is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true){
            return;
        }
        if(Platform.OS === 'web'){
            let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
            setSelectedImage({localUri:pickerResult.uri, remoteUri});
        }else{
            setSelectedImage({ localUri:pickerResult.uri, remoteUri:null });
        }
    };

    /*Check if sharing available on trying platform*/
    /*let openShareDialogAsync = async ()=> {
        if(!(await Sharing.isAvailableAsync())){
            alert(`Oops, sharing isn't available on your platform`);
            return;
        }

        await  Sharing.shareAsync(selectedImage.localUri);
    }*/

    /*Get remoteUri for web platform*/
    let openShareDialogAsync = async ()=> {
        if(!(await Sharing.isAvailableAsync())){
            alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
            return;
        }

        await  Sharing.shareAsync(selectedImage.localUri);
    }

    if(selectedImage !== null){
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri:selectedImage.localUri }}
                    style={styles.thumbnail}
                />
                <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Share this picture</Text>
                </TouchableOpacity>
            </View>
        )
    }

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
            To share a picture, just press the button below!
        </Text>

        {/*Add a simple button & basic inline styles*/}
        {/*<TouchableOpacity
            onPress={()=>alert('Hello World!')}
            style={{backgroundColor: 'blue'}}>
            <Text style={{ fontSize: 20, color: '#fff' }}>Choose a Photo</Text>
        </TouchableOpacity>*/}

        {/*Add a simple button & internal styles*/}
        {/*<TouchableOpacity
            onPress={()=>alert('Hello World!')}
            style={styles.button}>
            <Text style={styles.buttonText}>Choose a Photo</Text>
        </TouchableOpacity>*/}

        {/*Call image picker function when press button */}
        <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.button}>
            <Text style={styles.buttonText}>Choose a picture</Text>
        </TouchableOpacity>

      {/*<StatusBar style="auto" />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(44, 110, 160, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 15,
    },
    instructions:{
        color: '#222',
        fontSize: 18,
        marginHorizontal: 15,
        textAlign: 'center',
        marginBottom: 25,
    },
    button: {
        backgroundColor: 'rgba(0, 206, 209, 0.94)',
        padding: 15,
        borderRadius: 5,

    },
    buttonText : {
      fontSize: 20,
        color: '#4c4c4f',
    },
    thumbnail: {
      width: 300,
        height: 300,
        resizeMode: "contain",
        marginBottom: 20,
    },
});
