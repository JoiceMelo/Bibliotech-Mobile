import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import Home from "@/screens/homeScreen";
import Login from "@/screens/loginScreen";
import Register from "@/screens/registerScreen";
import Acervo from "@/screens/acervoScreen";
import Colecoes from "@/screens/colecoesScreen";
import Leituras from "@/screens/leiturasScreen";
import UserEditionScreen from "@/screens/userEditionScreen";
import AddCollectionScreen from "@/screens/addCollectionScreen";
import DetailsCollectionScreen from "@/screens/detailsCollectionScreen";
import UpdateCollectionScreen from "@/screens/updateCollectionScreen";
import AddBookScreen from "@/screens/addBookScreen";
import BookDetailsScreen from "@/screens/bookDetailsScreen";
import EditBookScreen from "@/screens/editBookScreen";
import ClearStorageScreen from "@/screens/clearStorageScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoggedInTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#e0bcdd' }, // Estiliza a cor de fundo da barra de abas
                tabBarActiveTintColor: 'black', // Cor dos ícones e texto das abas ativas
                tabBarInactiveTintColor: 'purple', // Cor dos ícones e texto das abas inativas
            }}
        >
            <Tab.Screen
                name="Acervo"
                component={Acervo}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="book" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Coleções"
                component={Colecoes}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="collections-bookmark" size={size} color={color}/>
                    )
                }}
            />
            <Tab.Screen
                name="Leituras"
                component={Leituras}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="book-reader" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="LoggedInTabs" component={LoggedInTabs} />
                <Stack.Screen name="UserEdition" component={UserEditionScreen} />
                <Stack.Screen name="AddCollectionScreen" component={AddCollectionScreen} />
                <Stack.Screen name="DetailsCollectionScreen" component={DetailsCollectionScreen} />
                <Stack.Screen name="UpdateCollectionScreen" component={UpdateCollectionScreen} />
                <Stack.Screen name="AddBookScreen" component={AddBookScreen} />
                <Stack.Screen name="BookDetailsScreen" component={BookDetailsScreen} />
                <Stack.Screen name="EditBookScreen" component={EditBookScreen} />
                {/*<Stack.Screen name="ClearStorageScreen" component={ClearStorageScreen} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}