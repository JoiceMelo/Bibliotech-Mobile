import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import CustomModal from "@/components/customModal";

const DetailsCollectionScreen = ({ route, navigation }) => {
    const { title, description } = route.params;
    const [collection, setCollection] = useState({ title, description, books: [] });

    const fetchUpdatedCollection = async () => {
        try {
            let colecoes = await AsyncStorage.getItem('colecoes');
            colecoes = colecoes ? JSON.parse(colecoes) : [];
            const updatedCollection = colecoes.find(c => c.title === title && c.description === description);
            if (updatedCollection) {
                setCollection(updatedCollection);
            } else {
                setCollection({ title, description, books: [] });
            }
        } catch (e) {
            console.error(e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUpdatedCollection();
        }, [])
    );

    const handleEditCollection = () => {
        navigation.navigate('UpdateCollectionScreen', { title: collection.title, description: collection.description });
    };

    const handleAddBook = () => {
        navigation.navigate('AddBookScreen', { collectionTitle: collection.title });
    };

    const handleBookPress = (book) => {
        navigation.navigate('BookDetailsScreen', { book, collectionTitle: collection.title, collectionDescription: collection.description });
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
                        source={require('../assets/images/images-project/bibliotech.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.pageTitle}>Bibliotech</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                    <Ionicons name="person-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Text style={styles.colecaoTitle}>{title}</Text>
                <Text style={styles.colecaoDescription}>{description}</Text>

                    {(collection.books != undefined && collection.books.length > 0) ? (
                        collection.books.map((book, index) => (
                            <TouchableOpacity key={index} onPress={() => handleBookPress(book)}>
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
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noBooksText}>Nenhum livro adicionado.</Text>
                    )}
                <TouchableOpacity style={styles.editButton} onPress={handleEditCollection}>
                    <Text style={styles.buttonText}>Editar coleção</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
                    <Text style={styles.buttonText}>Adicionar Livro</Text>
                </TouchableOpacity>
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
        marginBottom: 40,
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
        color: '#8b008b',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5
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
    },
    editButton: {
        backgroundColor: '#ac58aa',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 35
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
        marginTop: 10,
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
    bookTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6A1B9A',
        marginBottom: 8,
    },
    bookField: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 4,
    },
    noBooksText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#555',
        marginTop: 20,
    },
});

export default DetailsCollectionScreen;
