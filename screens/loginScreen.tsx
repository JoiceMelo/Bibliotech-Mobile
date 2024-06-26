import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setEmail('');
            setPassword('');
        });

        return unsubscribe;
    }, [navigation])

    const handleLogin = async () => {
        try {
            const storedUser = await AsyncStorage.getItem(email);
            if (storedUser !== null) {
                const { firstName, lastName, password: storedPassword } = JSON.parse(storedUser);
                if (storedPassword === password) {
                    Alert.alert('Sucesso', `Bem vindo, ${firstName} ${lastName}!`);
                    navigation.navigate("LoggedInTabs", { user: { firstName, lastName, email } });
                } else {
                    Alert.alert('Erro', 'Senha incorreta.');
                }
            } else {
                Alert.alert('Erro', 'Usuário não encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao fazer login.');
        }
    };

    const handleRegisterNavigation = () => {
        navigation.navigate("Register");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../assets/images/images-project/bibliotech.png")}
                    style={styles.logo}
                />
                <Text style={styles.pageTitle}>Bibliotech</Text>
            </View>
            <View style={styles.loginBox}>
                <Text style={styles.title}>Faça login na sua conta!</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        label="Email:"
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.registerText}>
                    Não tem uma conta ainda?{' '}
                    <Text style={styles.registerLink} onPress={handleRegisterNavigation}>
                        Criar conta
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#be7abb",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Alinha os itens à esquerda
        width: '90%', // Ajusta a largura conforme necessidade
        paddingHorizontal: 10, // Espaçamento horizontal para margem
    },
    logo: {
        height: 45,
        width: 45,
    },
    pageTitle: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 30,
        marginLeft: 10, // Espaçamento entre a logo e o texto
    },
    title: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 20,
        marginTop: 20,
        width: "100%",
        textAlign: 'left'
    },
    loginBox: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 16,
        alignItems: "center",
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        color: "#000",
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'left',
    },
    loginButton: {
        backgroundColor: "#ac58aa",
        borderRadius: 8,
        width: '100%',
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    registerText: {
        fontSize: 14,
        color: "#000000",
        marginTop: 10,
    },
    registerLink: {
        color: "#007BFF",
        textDecorationLine: "underline",
    }
})

export default Login;
