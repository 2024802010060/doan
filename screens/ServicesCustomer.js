import React, { useState, useEffect } from "react";
import { Image, View, FlatList, TouchableOpacity, Alert,StyleSheet, ImageBackground } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
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
        <TouchableOpacity onPress={() => handleAppointment(item)} style={{height:150, margin: 10,padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            {item.image !== "" && (
                    <View>
                        <Image
                            source={{ uri: item.image }}
                            style={{ height: 100, width: '100%'}}
                            resizeMode="contain"
                        />
                    </View>
                        )}   
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                        
                        <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.title}</Text>
                        <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.price} ₫</Text>
                    </View>
                    
            
        </TouchableOpacity>
    );
    

    const handleAppointment = (service) => {
        navigation.navigate("Appointment", { service });
    }

    
    return (
        <View style={{ flex: 1 }}>
            <SwiperFlatList style={{width:400,height:400,}} autoplay autoplayDelay={1} autoplayLoop index={2} showPagination>
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
            <TextInput
                label={"Tìm kiếm"}
                value={name}
                onChangeText={(text) => {
                    setName(text);
                    const result = initialServices.filter(service => service.title.toLowerCase().includes(text.toLowerCase()));
                    setServices(result);
                }}
            />
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
    Viewimg: {justifyContent:"center", alignItems:"center" },
    image: {width:400,height:220},
})

export default ServicesCustomer;
