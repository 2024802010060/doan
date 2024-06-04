import React, { useState, useEffect } from "react";
import { Image, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const Services = ({ navigation }) => {
    const [initialServices, setInitialServices] = useState([]);
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');

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

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleAppointment(item)} style={{ margin: 10,padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.title}</Text>
                <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.price} ₫</Text>
            </View>
        </TouchableOpacity>
    );
    
    const handleAppointment = (service) => {
        navigation.navigate("ServiceDetail", { service });
    }

    const handleUpdate = async (service) => {
        try {
            navigation.navigate("ServiceUpdate", { service });
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
        }
    }
    

    const handleDelete = (service) => {
        Alert.alert(
            "Cảnh báo",
            "Bạn có chắc muốn xóa sản phẩm không?",
            [
                {
                    text: "Trở lại",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: () => {
                        firestore()
                            .collection('Services')
                            .doc(service.id)
                            .delete()
                            .then(() => {
                                console.log("Sản phẩm đã được xóa thành công!");
                                navigation.navigate("Services");
                            })
                            .catch(error => {
                                console.error("Lỗi khi xóa sản phẩm:", error);
                            });
                    },
                    style: "default"
                }
            ]
        )
    }

    const handleDetail = (service) => {
        navigation.navigate("ServiceDetail", { service });
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={require("../assets/logo.png")}
                style={{
                    alignSelf: "center",
                    marginVertical: 20
                }}
            />
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
                    <TouchableOpacity onPress={() => navigation.navigate("AddNewService")}>
                      <Image source={require('../assets/add.png')} style={{ width: 30, height: 30, margin: 20 }} />
                    </TouchableOpacity>
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Services;
