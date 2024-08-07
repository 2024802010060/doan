import React, { useState, useEffect } from "react";
import { View, FlatList,StyleSheet } from "react-native";
import { Text,Card,Title,Paragraph,IconButton } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
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
    // show các lịch
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.text}>Mã xác nhận: {item.id}{item.id}</Title>
                <Paragraph style={styles.text}>Người đặt: {item.email}</Paragraph>
                <Paragraph style={styles.text}>Thời gian đặt: {item.datetime? item.datetime.toDate().toLocaleString('en-GB', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                    }): 'V/N'}</Paragraph>
                    <Paragraph style={styles.text}>Sản phẩm: {item.service}</Paragraph>
                    <Paragraph style={styles.text}>Giá: {item.price} vnđ </Paragraph>
                    <Paragraph style={styles.text}>Liên hệ: {item.phone}</Paragraph>
                    <Paragraph style={styles.text}>Trạng thái: {item.state}</Paragraph>
            </Card.Content>
            
        </Card>
        
    );
    
    return (
        <View style={{ flex: 1 , backgroundColor:"white"}}>
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
const styles = StyleSheet.create({
    text: {
        fontSize: 17, fontWeight: "bold"
    },
    card: {
        margin: 10,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#E0EEE0',
    },
});