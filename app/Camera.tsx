import { UploadBase64Image } from '@/Utils/FirebaseUtil';
import { Feather, Foundation, Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
export default function CameraScreen(){

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    
    const [photo,setPhoto] = useState({
      uri:'',
      base64:''
    });

    let TakePhoto = async () => {
     if (cameraRef.current){
        const options = { quality: 1, base64: true, exif: false };
        const photos = await cameraRef.current.takePictureAsync(options);

        setPhoto({uri: photos.uri,base64:photos.base64});
       
     }
    };
    let UploadImage= async ()=>{
     
      router.push('/Payment');
   
    }
    let CancelImage = async () => {
      setPhoto({uri:'',base64:''});
    }
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }

  
    return (
      <View style={styles.container}>
        
        {photo.uri == '' ? 
        <View style={{flex:1}}>
        <CameraView style={styles.camera} facing={'back'} ref={cameraRef} >
          
     
        </CameraView>
           <View style={styles.buttonContainer}>
           <Ionicons onPress={TakePhoto} style={styles.button} name="camera" size={35} color="black" />
           
           </View>
           </View>
        : 
        
        <View  style={{flex:1}}>
        <Image source={{uri:photo.uri}} style={{flex:1,width:'100%',height:'100%'}}></Image>
        <View style={styles.buttonContainer}>
          <Feather onPress={UploadImage} style={styles.button} name="save" size={35} color="black" />
          <Ionicons onPress={CancelImage} style={styles.button} name="return-down-back-outline" size={35} color="black" />
          </View>
        </View>
        
        }
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      height:'100%' // This ensures the container takes up the full height
    },
    camera: {
      flex: 1, // This ensures the CameraView fills the container
     
    },
    buttonContainer: {
      width:'100%',
      height:'7%',
      
      justifyContent:'center',
      flexDirection:'row',
      borderTopWidth:2
    },
    button: {
      alignSelf:'center',
      marginHorizontal:'10%',
      borderWidth:2,
      borderRadius:100,
      padding:5,
      paddingLeft:10
    },
  });