import React,{useEffect} from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet,Button,ScrollView } from "react-native";
import {logout, useMyContextProvider } from "../index";
import { NavigationContainer } from "@react-navigation/native";

const ProfileCustomer = ({navigation}) =>{
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate('Login')
    }, [userLogin])

    const handleLogout = () => {
        logout(dispatch);
    };
    const handleEdit = () => {
        navigation.navigate("ChangePassword");
    };
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Hồ sơ</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
                {userLogin !== null && (
                    <>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Email: </Text>
                            <Text style={styles.value}>{userLogin.email}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Mật khẩu: </Text>
                            <Text style={styles.value}>{userLogin.password}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Tên: </Text>
                            <Text style={styles.value}>{userLogin.fullName}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Địa chỉ: </Text>
                            <Text style={styles.value}>{userLogin.address}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Điện thoại: </Text>
                            <Text style={styles.value}>{userLogin.phone}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Cấp bậc: </Text>
                            <Text style={styles.value}>{userLogin.role}</Text>
                        </View>
                    </>
                )}
            </ScrollView>
            <View style={{ paddingLeft:40, paddingRight:40, paddingTop:250}}>
            <Button
                color={"orange"}
                textColor="#000000"
                mode="contained"
                
                onPress={() => handleEdit(userLogin)}
                title="Chỉnh sửa hồ sơ"
            >
            </Button>
            </View>
            <View style={{ paddingLeft:40, paddingRight:40, paddingTop:20}}>
            <Button
                color={"orange"}
                textColor="#000000"
                mode="contained"
                onPress={handleLogout}
                title="Đăng xuất"
            >
            </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Phân phối không gian giữa các phần tử
        backgroundColor:"white", flex:1
    },
    scrollViewContent: {
        padding: 10,
    },
    header: {
        padding: 15,
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'orange',
    },
    infoRow: {
        flexDirection: 'row',
        padding: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 20,
    },
    buttonContainer: {
        padding: 10,
        alignItems: 'center',
        
    },
    button: {
        width: '100',
        marginBottom: 10, // Khoảng cách giữa các nút
    },
    buttonLogout: {
        marginBottom: 10, // Đặt khoảng cách dưới cùng cho nút Đăng xuất
        
    },
});
export default ProfileCustomer;