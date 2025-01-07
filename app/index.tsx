import { View , StyleSheet, Alert,Image} from "react-native";
import { Form, WhiteSpace,Button,Text,Input} from "@ant-design/react-native";
import { useEffect, useState, } from "react";
import { router} from 'expo-router';
import { LoginAPI } from "@/Utils/Auth/LoginAPI";
import { EmailIcon, logo, passwordIcon } from "@/constants/Image";
import { validateEmail } from "@/Utils/ValidateUtil";
import { LinearGradient } from "expo-linear-gradient";
import { GetToken } from "@/Utils/TokenUtil";
import Toast from "react-native-toast-message";

export default function Index() {

  let [Email,SetEmail] = useState('');
  let [Password,SetPassword] = useState('');
  const HandleLogin = async () => {
   
   if (!validateEmail(Email)) {
    Toast.show({

      type: 'error', // You can use 'success', 'error', 'info'
      text1: `Sai định dạng email, email phải chứa kí tự @`,
      text1Style:{fontSize:13,color:'#40B59F'},
      position: 'top',

      topOffset: 20,

      visibilityTime: 3000, // Toast will disappear after 3 seconds

    });
      return;
    }
   if (await LoginAPI(Email,Password)) 
    { 

      router.replace("/(tabs)/GetDocument")

    } else {
      Toast.show({

        type: 'success', // You can use 'success', 'error', 'info'
        text1: `Đăng nhập thất bại, xin vui lòng đăng nhập lại`,
        text1Style:{fontSize:13,color:'#40B59F'},
        position: "top",
  
        topOffset: 30,
  
        visibilityTime: 2000, // Toast will disappear after 3 seconds
  
      });
      SetPassword("");
    }  
   
  }

  return (
    <LinearGradient   style={style.container}  colors={['#40B59F', '#fff']}
    locations={[0.41, 1]}>
           <Toast/>
      <Form style={style.form}>
        <View>
          <Image source={{uri : logo}} style={style.image} resizeMode="contain"/>
        </View>
      <View style={style.inputContainer}>
      <Image source={{uri:EmailIcon}} style={style.icon} resizeMode="contain"/>
            <Input     
                style={style.input} 
                placeholder="Email "
                value={Email}
                onChangeText={SetEmail}/>
      </View>
       <WhiteSpace/>
       <View>
       <Image source={{uri:passwordIcon}} style={[style.icon,{width:20,height:20, marginTop:15,marginLeft:15}]} resizeMode="contain"/>
            <Input 
                style={style.input} 
                inlineImageLeft=""
                type="password"
                placeholder="Mật khẩu "
                value={Password}
                onChangeText={SetPassword}/>
            </View>
       <WhiteSpace/>
          <Button style={[style.btn]} onPress={HandleLogin}><Text style={[style.text,{fontFamily:'Quicksand'}]}>Đăng nhập</Text></Button>
      </Form>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
    flexDirection:'row',
    alignItems:'center'
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fdf7e2',
    paddingLeft:50,
    zIndex:0
  },
  btn:{
    marginTop:'6%',
    backgroundColor:'#239D5B',
    borderRadius: 16,
    borderColor : 'rgba(0, 0, 0, 0)',
    fontWeight:'bold',
    fontSize:16
  }, 
  image:{
    width:'100%',
    height:100,
    marginBottom:15
  },
  backgroundImage:{
    flex:1,
    width:'100%',
    height:'100%',
    position:'absolute'
  },
  text:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold'
  },
  icon:{
    marginLeft:10,
    flex:1,
    width:30,
    height:25,
    position:'absolute',
    zIndex:1
  }

});
