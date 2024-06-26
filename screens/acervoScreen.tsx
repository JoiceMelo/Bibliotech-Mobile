import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import CustomModal from '../components/customModal';

const Acervo = () => {
    const navigation = useNavigation();
    const route = useRoute

    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState<{ firstName: string, lastName: string, email: string } | null>(null);

    const fetchUser = async () => {
        const storedUserEmail = await AsyncStorage.getItem('loggedInUserEmail');
        if (storedUserEmail) {
            const storedUser = await AsyncStorage.getItem(storedUserEmail);
            if (storedUser) {
                const userObject = JSON.parse(storedUser);
                setUser({ firstName: userObject.firstName, lastName: userObject.lastName, email: storedUserEmail });
            } else {
                console.error('Usuário não encontrado no AsyncStorage.');
            }
        } else {
            console.error('Nenhum usuário logado encontrado no AsyncStorage.');
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUser();
        });

        return unsubscribe;
    }, [navigation]);

    const handleAddBook = () => {
        navigation.navigate('Coleções');
    };

    const handleAddCollection = () => {
        navigation.navigate('AddCollectionScreen');
    };

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
            <Image
                source={require('../assets/images/images-project/empty.png')}
                style={styles.image}
            />
            <Text style={styles.message}>Comece sua coleção!</Text>
            <TouchableOpacity style={styles.button} onPress={handleAddCollection}>
                <Text style={styles.buttonText}>Criar nova coleção</Text>
            </TouchableOpacity>

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
});

export default Acervo;