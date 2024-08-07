import { createStackNavigator } from "@react-navigation/stack";
import ServicesCustomer from '../screens/ServicesCustomer';
import { useMyContextProvider } from "../index";
import Appointment from "../screens/Appointment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import ChangePassword from "../screens/ChangePassword";

const Stack = createStackNavigator();

const RouterServiceCustomer = ({ navigation }) => {
    const [controller] = useMyContextProvider();
    const { userLogin } = controller;

    return (
        //thanh ở trên đầu của cus
        <Stack.Navigator
            initialRouteName="ServicesCustomer"
            screenOptions={{
                title: "Đặt hàng",
                headerTitleAlign: "left",
                headerStyle: {
                    backgroundColor: "orange"
                },
                headerRight: (props) => (
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileCustomer")}>
                      <Image source={require('../assets/account.png')} style={{ width: 30, height: 30, margin: 20 }} />
                    </TouchableOpacity>
                  ),
            }}
        >
            <Stack.Screen 
            name="ChangePassword" 
            component={ChangePassword} 
            options={({ route }) => ({title:"Đổi thông tin" })}
            />
            <Stack.Screen options={{headerLeft: null, title: (userLogin != null) && (userLogin.fullName)}} name="ServicesCustomer" component={ServicesCustomer} />
            <Stack.Screen name="Appointment" component={Appointment} />
        </Stack.Navigator>
    )
}

export default RouterServiceCustomer;
