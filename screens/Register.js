import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { createAccount } from '../index';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);

  const hasErrorFullName = () => fullName === "";
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => confirmPassword !== password;

  useEffect(() => {
    setDisableCreate(
      hasErrorFullName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      phone.trim() === '' ||
      address.trim() === ''
    );
  }, [fullName, email, password, confirmPassword, phone, address, hasErrorFullName, hasErrorEmail, hasErrorPassword, hasErrorPasswordConfirm]);

  const handleRegister = () => {
    createAccount(email, password, fullName, phone, address, role);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
        color: "green",
        marginTop: 50,
        marginBottom: 50
      }}> Register New Account </Text>
      <TextInput
        label={"Full Name"}
        value={fullName}
        onChangeText={setFullname}
        style={{ borderRadius: 15, marginRight:40,marginLeft:40 }}
      />
      <HelperText style={{marginLeft:40 }} type='error' visible={hasErrorFullName()} >
        Full name không được phép để trống
      </HelperText>
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
        style={{ borderRadius: 15, marginRight:40,marginLeft:40 }}
      />
      <HelperText style={{marginLeft:40 }} type='error' visible={hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
      <View style={{ flexDirection: "row",marginLeft:40 }}>
        <TextInput
          label={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? require('../assets/eye.png') : require('../assets/eye-hidden.png')}
            style={{ width: 20, height: 20,marginTop:20, marginLeft:10,marginRight:10}}
          />
        </TouchableOpacity>
      </View>
      <HelperText style={{marginLeft:40 }} type='error' visible={hasErrorPassword()}>
        Password ít nhất 6 kí tự
      </HelperText>
      <View style={{ flexDirection: "row",marginLeft:40 }}>
        <TextInput
          label={"Confirm Password"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={showConfirmPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Image
            source={showConfirmPassword ? require('../assets/eye.png') : require('../assets/eye-hidden.png')}
            style={{ width: 20, height: 20,marginTop:20, marginLeft:10,marginRight:10}}
          />
        </TouchableOpacity>
      </View>
      
      <HelperText style={{marginLeft:40}} type='error' visible={hasErrorPasswordConfirm()}>
        Confirm Password phải giống với Password
      </HelperText>
      <TextInput
        label={"Address"}
        value={address}
        onChangeText={setAddress}
        style={{ marginBottom: 20,borderRadius: 15, marginRight:40,marginLeft:40 }}
      />
      <TextInput
        label={"Phone"}
        value={phone}
        onChangeText={setPhone}
        style={{ marginBottom: 20,borderRadius: 15, marginRight:40,marginLeft:40 }}
      />
      <Button style={{ marginRight:40,marginLeft:40}} textColor='white' buttonColor='#FF6699' mode='contained' onPress={handleRegister} disabled={disableCreate}>
        Create New Account
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text>Do you have an account ?</Text>
        <Button onPress={() => navigation.navigate("Login")}>
          Login Account
        </Button>
      </View>
    </View>
  );
};

export default Register;
