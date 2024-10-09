import { View , StyleSheet, Alert,Image,TouchableOpacity} from "react-native";
import { Form, WhiteSpace,Button,Text,Input} from "@ant-design/react-native";
import { useState } from "react";
import { Asset} from "expo-asset";
import { LinearGradient } from "expo-linear-gradient";
import { LoginAPI } from "@/Utils/LoginAPI/LoginAPI";

export default function LoginScreen() {
  let [Email,SetEmail] = useState('');
  let [Password,SetPassword] = useState('');
  
  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
  };
  const HandleLogin = async () => {
    if (validateEmail(Email)) {
    } else {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }
    await LoginAPI(Email,Password);
  }

  const logo = Asset.fromModule(require('../assets/images/ProTranslogo_standard.png')).uri;
 
  return (
  <LinearGradient colors={['#87CEEB', '#1E90FF']} style={style.container}>
      <Form style={style.form}>
        <View>
          <Image source={{uri : logo}} style={style.image} resizeMode="contain"/>
        </View>
      <View>
            <Text style={{marginBottom : 5}}>Email</Text>
            <Input 
                
                style={style.input} 
                placeholder="Email đăng nhập"
                value={Email}
                onChangeText={SetEmail}/>
      </View>
       <WhiteSpace/>
       <View>
            <Text style={{marginBottom : 5}}>Password</Text>
            <Input 
                style={style.input} 
                type="password"
                placeholder="Mật khẩu đăng nhập"
                value={Password}
                onChangeText={SetPassword}/>
            </View>
       <WhiteSpace/>
          <TouchableOpacity onPress={HandleLogin} style={style.buttonContainer}>
            <LinearGradient
               colors={['#87CEEB', '#1E90FF']}
                style={style.button}>
              <Text style={style.buttonText}>Đăng nhập</Text>
            </LinearGradient>
          </TouchableOpacity>
      </Form>
    </LinearGradient>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: '90%',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fdf7e2',
  },
  btn:{
    marginTop:'5%',
    width:'50%',
    marginHorizontal:'20%',
    borderRadius: 10,
    borderWidth : 2,
    backgroundColor : '#01F8EC',
    borderColor : '#000000'

  }, 
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal : 15,
    paddingVertical : 5,
    width:'50%',
    marginHorizontal : '25%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  image:{
    width:'100%',
    height:100,
    marginBottom:15
  }

});