import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddCollectionScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateCollection = async () => {
        try {
            console.log("Iniciando o processo de registro de coleção...");

            const colecao = { title, description };
            console.log("Coleção a ser salva: ", colecao);

            let colecoes = await AsyncStorage.getItem('colecoes');
            colecoes = colecoes ? JSON.parse(colecoes) : [];
            colecoes.push(colecao);
            await AsyncStorage.setItem('colecoes', JSON.stringify(colecoes));

            console.log("Coleções armazenadas: ", colecoes);

            navigation.navigate('Coleções');
        } catch (e) {
            console.error(e);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
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
            <View style={styles.content}>
                <Text style={styles.label}>Nome da coleção</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome da coleção"
                    value={title}
                    onChangeText={setTitle}
                />
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Digite a descrição da coleção"
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ac58aa' }]} onPress={handleCreateCollection}>
                    <Text style={styles.buttonText}>Criar coleção</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6347' }]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#be7abb",
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 20,
        marginTop: -130
    },
    logo: {
        height: 45,
        width: 45,
    },
    pageTitle: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 24,
        marginLeft: 10,
    },
    content: {
        width: '100%',
        marginTop: 45
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default AddCollectionScreen;