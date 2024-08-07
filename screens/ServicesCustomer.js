import React, { useState, useEffect } from "react";
import { Image, TextInput, View, FlatList, TouchableOpacity, Alert,StyleSheet, ImageBackground,  } from "react-native";
import { IconButton, Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
const ServicesCustomer = ({ navigation }) => {
    const [initialServices, setInitialServices] = useState([]);
    const [services, setServices] = useState([]);
   

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Services')
            .onSnapshot(querySnapshot => {
                const services = [];
                querySnapshot.forEach(documentSnapshot => {
                    services.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setServices(services);
                setInitialServices(services);
            });

        return () => unsubscribe();
    }, []);

    const [name, setName] = useState('')
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleAppointment(item)} style={{flexDirection: "row",height:150, margin: 10,padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <View style={{height:130, width:150}}>
            {item.image !== "" && (
                    <View>
                        <Image
                            source={{ uri: item.image }}
                            style={{ height: 100, width: '100%'}}
                            resizeMode="contain"
                        />
                    </View>
                        )}   
            </View>
                <View style={{height:150, width:200}}>  
                    <Text style={{fontSize: 18, fontWeight: "bold"}}>Sản phẩm: {item.title}</Text>
                    <Text style={{fontSize: 18, fontWeight: "bold"}}>Giá: {item.price} vnđ</Text>
                    
                </View>
        </TouchableOpacity>
    );
    

    const handleAppointment = (service) => {
        navigation.navigate("Appointment", { service });
    }

    
    return (
        <View style={{ backgroundColor:"white"}}>
            <SwiperFlatList style={{width:400,height:360,}} autoplay autoplayDelay={2} autoplayLoop index={0} showPagination>
                <View style={styles.Viewimg}>
                    <Image style={styles.image} source={require("../assets/3-Fishsticks.jpg")}></Image>
                </View>
                <View style={styles.Viewimg}>
                    <Image style={styles.image} source={require("../assets/3-taro.jpg")}></Image>
                </View>
                <View style={styles.Viewimg}>
                    <Image style={styles.image} source={require("../assets/ga_2_mieng.png")}></Image>
                </View>
            </SwiperFlatList>
            <View style={{paddingLeft:20,paddingRight:20}} >
            <TextInput
                
                value={name}
                placeholder="Tìm kiếm"
                onChangeText={(text) => {
                    setName(text);
                    const result = initialServices.filter(service => service.title.toLowerCase().includes(text.toLowerCase()));
                    setServices(result);
                }}
                style={{borderColor: "#0066cc",
                    borderWidth: 1,
                    borderRadius: 50, // Tăng giá trị này nếu muốn bo tròn hơn nữa
                    paddingHorizontal: 16,
                    height: 60, // Đảm bảo chiều cao phù hợp với borderRadius
                    fontSize:20
                    }}
            />
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    padding: 15,
                    fontSize: 25,
                    fontWeight: "bold",
                }}>
                    Danh sách dịch vụ</Text>
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                
            />
        </View>
    )
}
const styles = StyleSheet.create({
    rowitem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: "#F0F0F1"
    },
    Viewimg: {
        paddingLeft:15,
        justifyContent:"center", 
        alignSelf:"center",
        
    },
    image: {
        width:390,
        height:220,
        
    },
})

export default ServicesCustomer;
