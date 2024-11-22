import { useImageShipping } from '@/Model/ImageShippingModel';
import { UploadBase64Image } from '@/Utils/FirebaseUtil';
import { UpdateURL } from '@/Utils/ImageShippingAPI/ImageShippingAPI';
import { UpdateOrder } from '@/Utils/OrderAPI/OrderAPI';
import { UpdateTaskStatusCompleted } from '@/Utils/ShippingAPI/ShippingAPI';
import { GetToken } from '@/Utils/TokenUtil';
import { Feather, Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';

export default function CameraScreen(){

    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const Data = useLocalSearchParams();
    const Token = GetToken();
    const ImageShippingid = useImageShipping(Token,Data.taskId.toString());
    console.log(Data.taskId)
    console.log(ImageShippingid)
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
      Alert.alert(
        'Chọn ảnh',
        'Bạn có chắc chắn muốn chọn ảnh này ?, Chọn có sẽ không thể hoàn tác hành động',
        [
          {
            text: 'Không',
            style: 'cancel',
          },
          { text: 'Có', onPress: () => 
            {
              UploadBase64Image(photo.uri,ImageShippingid[0].id.toString()) .then(imageUrl => {
                if (imageUrl) {
                  console.log('Image uploaded successfully:');

                  //const encodedUrl = imageUrl.replace(/Images\//, "Images%2F");
                  UpdateURL(Token,ImageShippingid[0].id.toString(),imageUrl)
                  UpdateOrder(Token,Data.orderId.toString());
                  UpdateTaskStatusCompleted(Token,Data.taskId.toString());
                  router.push({pathname: '/(tabs)/Shipping' });
                  // Use the imageUrl for further operations
                } else {
                  console.error('Error uploading image');
                }
              })
              .catch(error => {
                console.error('Error uploading image:', error);
              });
              
          }
         },
        ]
      );
     
   
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