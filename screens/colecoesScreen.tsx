import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import CustomModal from "@/components/customModal";

const Collection = ({ navigation }) => {
    const [colecoes, setColecoes] = useState([]);

    const fetchColecoes = async () => {
        try {
            let storedColecoes = await AsyncStorage.getItem('colecoes');
            storedColecoes = storedColecoes ? JSON.parse(storedColecoes) : [];
            console.log("Coleções carregadas: ", storedColecoes);
            setColecoes(storedColecoes);
        } catch (e) {
            console.error(e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchColecoes();
        }, []),
    );

    const handleAddBook = (colecao) => {
        navigation.navigate('AddBookScreen', { collectionTitle: colecao.title });
    };

    const handleAddCollection = () => {
        navigation.navigate('AddCollectionScreen');
    };

    const handleCollectionPress = (colecao) => {
        navigation.navigate('DetailsCollectionScreen', { title: colecao.title, description: colecao.description });
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState<{ firstName: string, lastName: string, email: string } | null>(null);

    const handleSettings = () => {
        navigation.navigate('UserEdition');
        setModalVisible(false);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Login');
        } catch (error) {
            console.log('Error during logout:', error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Image
                        source={require("../assets/images/images-project/bibliotech.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.pageTitle}>Bibliotech</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                    <Ionicons name="person-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={handleAddCollection}>
                    <Text style={styles.addButtonText}>Criar Nova Coleção</Text>
                </TouchableOpacity>
                <View style={styles.colecoesContainer}>
                    {colecoes.map((colecao, index) => (
                        <TouchableOpacity key={index} style={styles.colecaoCard} onPress={() => handleCollectionPress(colecao)}>
                            <Text style={styles.colecaoTitle}>{colecao.title}</Text>
                            <Text style={styles.colecaoDescription}>{colecao.description}</Text>
                            <TouchableOpacity style={styles.addBookButton} onPress={() => handleAddBook(colecao)}>
                                <Text style={styles.addBookButtonText}>Adicionar Livro</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                    </View>
            </ScrollView>

            <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                user={user}
                handleSettings={handleSettings}
                handleLogout={handleLogout}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#be7abb",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 60,
        marginTop: -120
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 126,
    },
    logo: {
        width: 45,
        height: 45,
        marginRight: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },
    iconButton: {
        padding: 10,
        marginTop: 126
    },
    image: {
        width: 150,
        height: 150,
    },
    message: {
        fontSize: 25,
        color: "#000",
        marginVertical: 20,
    },
    button: {
        backgroundColor: "#ac58aa",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        width: 200,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#ac58aa',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    colecoesContainer: {
        width: '100%',
        marginTop: 30,
    },
    colecaoCard: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    colecaoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    colecaoDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    addBookButton: {
        backgroundColor: '#ac58aa',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    addBookButtonText: {
        color: '#fff',
        fontSize: 14,
    }
});

export default Collection;