import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        });

        return unsubscribe;
    }, [navigation])

    const handleRegister = async () => {
        console.log("Iniciando o processo de registro...");

        Alert.alert('Registro', 'Botão "Criar conta" pressionado');

        if (firstName && lastName && email && password) {
            console.log("Dados inseridos - Nome:", firstName, "Sobrenome:", lastName, "Email:", email);
            try {
                await AsyncStorage.setItem(email, JSON.stringify({ firstName, lastName, password }));
                await AsyncStorage.setItem('loggedInUserEmail', email);
                Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
                navigation.navigate("Login");
            } catch (error) {
                Alert.alert('Erro', 'Falha ao registrar usuário.');
            }
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }
    };

    const handleLoginNavigation = () => {
        navigation.navigate("Login");
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
            <View style={styles.registerBox}>
                <Text style={styles.title}>Criar sua conta</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sobrenome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu sobrenome"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>
                <Text style={styles.loginText}>
                    Já tem uma conta?{' '}
                    <Text style={styles.loginLink} onPress={handleLoginNavigation}>
                        Entre aqui
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
        width: '100%',
        color: "#000000",
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'left',
    },
    registerBox: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 16,
        alignItems: "center",
        marginTop: 80,
        marginBottom: 3
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    label: {
        color: "#000",
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    registerButton: {
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
    loginText: {
        fontSize: 14,
        color: "#000000",
        marginTop: 10,
        textAlign: 'center',
    },
    loginLink: {
        color: "#007BFF",
        textDecorationLine: "underline",
    }
})


export default Register;
