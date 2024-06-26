import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation();

    const login = () => {
        console.log("logou carai");
        navigation.navigate("Login");
    };

    const register = () => {
        console.log("vai fazer o registro, fia!");
        navigation.navigate("Register");
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/images-project/bibliotech.png")}
                style={styles.logo}
            />
            <Text style={styles.title}>Bibliotech</Text>
            <View>
                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#be7abb",
            justifyContent: "center",
            alignItems: "center"
        },
        logo: {
            marginTop: 18,
            height: 150,
            width: 150
        },
        title: {
            color: "#000000",
            fontWeight: "bold",
            fontSize: 40,
            marginBottom: 20,
            marginTop: 20
        },
        buttonText: {
            color: "#FFF",
            fontSize: 20,

        },
        button: {
            backgroundColor: "#ac58aa",
            width: 180,
            height: 65,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            marginBottom: 18

        }
    })

export default Home;