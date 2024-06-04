import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useMyContextProvider } from "../index";
const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;
    const [services, setServices] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Appointments')
            .where('email', '==', userLogin.email)
            .onSnapshot(querySnapshot => {
                const appointmentsData = [];
                querySnapshot.forEach(documentSnapshot => {
                    appointmentsData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setAppointments(appointmentsData);
                setServices(appointmentsData);
            });
            
        return () => unsubscribe();
    }, []);
    
    const renderItem = ({ item }) => (
        <View style={{  margin: 10, padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Mã xác nhận:{item.id} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Người đặt:{item.email}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Ngày đặt:{item.datetime ? item.datetime.toDate().toString() : 'V/N'}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor:"orange"}}>
                <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold", backgroundColor:"orange" }}>Đơn hàng</Text>
            </View>
            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Appointments;
