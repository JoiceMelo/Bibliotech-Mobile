import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateCollectionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { title, description } = route.params;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const handleUpdateCollection = async () => {
        try {
            const colecoesStr = await AsyncStorage.getItem('colecoes');
            let colecoes = colecoesStr ? JSON.parse(colecoesStr) : [];

            const updatedCollections = colecoes.map((colecao) => {
                if (colecao.title === title && colecao.description === description) {
                    return { title: newTitle, description: newDescription };
                }
                return colecao;
            });

            await AsyncStorage.setItem('colecoes', JSON.stringify(updatedCollections));
            Alert.alert('Sucesso', 'Coleção atualizada com sucesso!');
            navigation.navigate('DetailsCollectionScreen', { title: newTitle, description: newDescription });
        } catch (error) {
            console.error('Erro ao atualizar coleção', error);
            Alert.alert('Erro', 'Não foi possível atualizar a coleção');
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
                    value={newTitle}
                    onChangeText={setNewTitle}
                />
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    placeholder="Digite a descrição da coleção"
                    value={newDescription}
                    onChangeText={setNewDescription}
                    multiline
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ac58aa' }]} onPress={handleUpdateCollection}>
                    <Text style={styles.buttonText}>Atualização coleção</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6347' }]} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Descartar alterações</Text>
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

export default UpdateCollectionScreen;
