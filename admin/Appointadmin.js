import React, { useState, useEffect } from "react";
import { View, FlatList,TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';

const Appointadmin = () => {
    const [appointments, setAppointments] = useState([]);
    const [aw,setAw]=useState([]);
    const [isSelected, setSelection] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Appointments')
            .onSnapshot(querySnapshot => {
                const appointmentsData = [];
                querySnapshot.forEach(documentSnapshot => {
                    appointmentsData.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setAppointments(appointmentsData);
            });

        return () => unsubscribe();
    }, []);

    const handleUpdateService = async (item) => {
        try {
            await firestore()
                .collection('Appointments')
                .doc(item)
                .update({
                    state: "complete"
                });
        } catch (error) {
            console.error("Lỗi khi cập nhật dịch vụ:", error);
        }
        
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>handleUpdateService(item.id)}  style={{  margin: 10, padding: 15, borderRadius: 15, marginVertical: 5, backgroundColor: '#e0e0e0' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Mã xác nhận:{item.id} </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Người đặt:{item.email}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Ngày đặt:{item.datetime ? item.datetime.toDate().toString() : 'V/N'}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Trạng thái:{item.state}</Text>
        </TouchableOpacity>
    );
    
    
    return (
        <View style={{ flex: 1 ,paddingBottom:60}}>
            <Text style={{ padding: 15, fontSize: 25, fontWeight: "bold", backgroundColor:"orange" }}>Đơn hàng</Text>
            <View>
            <FlatList
                data={appointments}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            
            </View>
        </View>
    )
}

export default Appointadmin;
