import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useMyContextProvider, login } from '../index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BorderlessButton } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [showPassword, setShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;

  useEffect(() => {
    setDisableLogin(email.trim() === '' || password.trim() === '' || hasErrorEmail() || hasErrorPassword());
  }, [email, password, hasErrorEmail, hasErrorPassword]);

  const handleLogin = () => {
    login(dispatch, email, password);
    
  };

  useEffect(() => {
    console.log(userLogin)
    if (userLogin != null) {
      if (userLogin.role === "admin")
        navigation.navigate("Admin")
      else if (userLogin.role === "customer")
        navigation.navigate("Customer")
    }
  }, [userLogin])

  return (
    <View style={{ flex: 1, padding: 10,backgroundColor:"orange" }}>
      
      <Image source={require("../assets/logo.png")}
                style={{
                    alignSelf: "center",
                    marginTop: 100,
                    marginBottom:30,
                }}
            />
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
        style={{ marginRight:40,marginLeft:40, backgroundColor:"white"}}
      />
      <HelperText style={{marginLeft:35, fontSize:15}} type='error' visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>
      <View style={{ flexDirection: "row" ,marginLeft:40}}>
        <TextInput
          label={"Mật khẩu"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          style={{ backgroundColor:"white",flex:1}}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? require('../assets/eye.png') : require('../assets/eye-hidden.png')}
            style={{ width: 20, height: 20,marginTop:20, marginLeft:10,marginRight:10}}
          />
        </TouchableOpacity>
      </View>
      <HelperText style={{marginLeft:35, fontSize:15}} type='error' visible={hasErrorPassword()}>
        Password có ít nhất 6 ký tự
      </HelperText>
      <Button style={{marginRight:40,marginLeft:40}} mode='contained' textColor='black' fontSize='20' buttonColor='white' onPress={handleLogin} disabled={disableLogin}>
      Đăng nhập
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        
        <Button  onPress={() => navigation.navigate("Register")} >
        Tạo tài khoản
        </Button>
        <Button onPress={() => navigation.navigate("ForgotPassword")}>
          Quên mật khẩu
        </Button>
      </View>
      
      
    </View>
  );
};

export default Login;
