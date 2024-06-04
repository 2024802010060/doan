import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterServiceCustomer from "../routers/RouterServiceCustomer";
import Appointments from "./Appointments";
import ProfileCustomer from "./ProfileCustomer";
import { Image } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const Customer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterServiceCustomer"
        component={RouterServiceCustomer}
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/home.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          title: "Đơn hàng",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/appointment.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileCustomer"
        component={ProfileCustomer}
        options={{
          title: "Hồ sơ",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../assets/customer.png")}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default Customer;
