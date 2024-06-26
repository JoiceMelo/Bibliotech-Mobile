import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from "@expo/vector-icons";
import CustomModal from "@/components/customModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Leituras = () => {
    const [status, setStatus] = useState(null);
    const [books, setBooks] = useState([]);
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState<{ firstName: string, lastName: string, email: string } | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                let colecoes = await AsyncStorage.getItem('colecoes');
                colecoes = colecoes ? JSON.parse(colecoes) : [];

                const allBooks = colecoes.flatMap(colecao => colecao.books || []);
                setBooks(allBooks);
            } catch (error) {
                console.log('Error loading books:', error);
            }
        };

        loadBooks();
    }, []);

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
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    const filteredBooks = books.filter(book => book.status === status);

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
            <Text style={styles.statusTitle}>Status de leitura</Text>
            <View style={styles.statusContainer}>
                <TouchableOpacity style={styles.statusItem} onPress={() => handleStatusChange('Não Lido')}>
                    <View style={[styles.statusCircle, status === 'Não Lido' && styles.selectedCircle]} />
                    <Text style={styles.statusText}>Não lido</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statusItem} onPress={() => handleStatusChange('Lendo')}>
                    <View style={[styles.statusCircle, status === 'Lendo' && styles.selectedCircle]} />
                    <Text style={styles.statusText}>Lendo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statusItem} onPress={() => handleStatusChange('Lido')}>
                    <View style={[styles.statusCircle, status === 'Lido' && styles.selectedCircle]} />
                    <Text style={styles.statusText}>Lido</Text>
                </TouchableOpacity>
            </View>

            <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                user={user}
                handleSettings={handleSettings}
                handleLogout={handleLogout}
            />

            <ScrollView style={styles.booksContainer}>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <View key={index} style={styles.bookCard}>
                            <Image
                                source={require('../assets/images/images-project/books.jpg')}
                                style={styles.thumbnail}
                            />
                            <View style={styles.bookInfo}>
                                <Text style={styles.bookTitle}>{book.title}</Text>
                                <Text style={styles.bookField}>Autor: {book.author}</Text>
                                <Text style={styles.bookField}>Ano: {book.year}</Text>
                                <Text style={styles.bookField}>Edição: {book.edition}</Text>
                                <Text style={styles.bookField}>Páginas: {book.pages}</Text>
                                <Text style={styles.bookField}>ISBN: {book.isbn}</Text>
                                <Text style={styles.bookField}>Status: {book.status}</Text>
                                <Text style={styles.bookField}>Categorias: {Object.keys(book.categories)
                                    .filter(category => book.categories[category])
                                    .join(', ')}</Text>
                                <Text style={styles.bookField}>Descrição: {book.description}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.statusSubTitle}>Não há livros com esse status</Text>
                )}
            </ScrollView>
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
        marginTop: 10
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
    statusTitle: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
        marginTop: -30
    },
    statusSubTitle: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
        marginTop: 70
    },
    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    statusItem: {
        alignItems: "center",
    },
    statusCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 5,
        backgroundColor: "#fff",
    },
    selectedCircle: {
        backgroundColor: "#000",
    },
    statusText: {
        fontSize: 16,
        color: "#000",
    },
    bookCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        marginTop: 50,
        marginBottom: 10,
    },
    thumbnail: {
        width: 60,
        height: 90,
        borderRadius: 5,
    },
    bookInfo: {
        marginLeft: 20,
        flex: 1,
    },
    bookField: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 4,
    },
    bookTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6A1B9A',
        marginBottom: 8,
    },
    booksContainer: {
        width: '100%',
        marginTop: 10,
    },
});

export default Leituras;