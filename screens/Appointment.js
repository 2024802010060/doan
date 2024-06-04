import React, { useState } from "react"
import { View, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Button, Text } from "react-native-paper"
import datetime from "react-native-date-picker"
import DatePicker from "react-native-date-picker"
import firestore from "@react-native-firebase/firestore"
import { useMyContextProvider } from "../index"
import Appointments from "./Appointments"

const Appointment = ({navigation, route }) => {
    const { service } = route.params || {};
    const [datetime, setDatetime] = useState(new Date())
    const [dateadd,setDateadd]=useState("")
    const [open, setOpen] = useState(false)
    const [controller, dispatch] = useMyContextProvider()
    const {userLogin} = controller
    const APPOINTMENTs = firestore().collection("Appointments")

    const handleSubmit = () =>{
        
        APPOINTMENTs
        .add({
            email: userLogin.email,
            serviceId: service.id,
            datetime,
            state: "new"
        })
        .then(r => 
            {
                APPOINTMENTs.doc(r.id).update({id: r.id})
                navigation.navigate("Appointments")
            })
    }
      
    return (
        <View style={{padding: 10}}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tên dịch vụ: </Text>
                <Text style={{ fontSize: 20 }}>{service && service.title}</Text>
            </View>
            
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Giá: </Text>
                <Text style={{ fontSize: 20}}>{service && service.price} ₫</Text>
            </View>
            {service && service.image !== "" && (
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ảnh: </Text>
                    <Image
                        source={{ uri: service && service.image }}
                        style={{ height: 300, width: '100%' }}
                        resizeMode="contain"
                    />
                </View>
            )}
            <DatePicker
                modal
                mode="datetime"
                open={open}
                date={datetime}
                format="YYYY-MM-DD HH:mm"
                onConfirm={(date) => {
                    setOpen(false)
                    setDatetime(date)
                    
                }}
                onCancel={()=>{
                    setOpen(false)
                }}
            />
            <TouchableOpacity
                onPress={()=> setOpen(true)}            
                style={{flexDirection:"row", justifyContent: "flex-start"}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thời gian: </Text>
                <Text style={{ fontSize: 20}}>{`${datetime.getHours()}:${datetime.getMinutes()} | `}</Text>
                <Text style={{ fontSize: 20}}>{`${datetime.getDate()}-${datetime.getMonth()}-${datetime.getFullYear()}`}</Text>
                
            </TouchableOpacity>
            <Button style={{margin: 10}} textColor="black" buttonColor="orange" mode="contained" onPress={handleSubmit}>  
                Đặt lịch
            </Button>
        </View>
    )
}

export default Appointment;
