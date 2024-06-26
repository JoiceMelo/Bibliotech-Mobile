import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ScrollView} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from 'react-native-elements';

const AddBookScreen = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [edition, setEdition] = useState('');
    const [pages, setPages] = useState('');
    const [isbn, setIsbn] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [categories, setCategories] = useState({
        fiction: false,
        juvenile: false,
        religion: false,
        arts: false,
        education: false,
    });

    const navigation = useNavigation();
    const route = useRoute();
    const { collectionTitle } = route.params;

    const handleCreateBook = async () => {
        if (title && author && year && edition && pages && isbn && description && status) {
            const newBook = { title, author, year, edition, pages, isbn, description, status, categories };
            try {
                let colecoes = await AsyncStorage.getItem('colecoes');
                colecoes = colecoes ? JSON.parse(colecoes) : [];

                const updatedCollections = colecoes.map((colecao) => {
                    if (colecao.title === collectionTitle) {
                        if (!colecao.books) colecao.books = [];
                        colecao.books.push(newBook);
                        return { ...colecao, books: colecao.books };
                    }
                    return colecao;
                });

                await AsyncStorage.setItem('colecoes', JSON.stringify(updatedCollections));
                navigation.navigate('BookDetailsScreen', { book: newBook });
            } catch (error) {
                console.log('Error saving book:', error);
            }
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleCheckboxChange = (category) => {
        setCategories({ ...categories, [category]: !categories[category] });
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
                <ScrollView>
                    <Text style={styles.label}>Status de Leitura</Text>
                    <View style={styles.radioGroup}>
                        <TouchableOpacity onPress={() => setStatus('Lido')} style={styles.radioButton}>
                            <View style={[styles.radioCircle, status === 'Lido' && styles.selectedRadio]} />
                            <Text style={styles.radioText}>Lido</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStatus('Lendo')} style={styles.radioButton}>
                            <View style={[styles.radioCircle, status === 'Lendo' && styles.selectedRadio]} />
                            <Text style={styles.radioText}>Lendo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStatus('Não Lido')} style={styles.radioButton}>
                            <View style={[styles.radioCircle, status === 'Não Lido' && styles.selectedRadio]} />
                            <Text style={styles.radioText}>Não Lido</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Título do Livro</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o título do livro"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text style={styles.label}>Autor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o autor"
                        value={author}
                        onChangeText={setAuthor}
                    />
                    <Text style={styles.label}>Ano de Publicação</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o ano de publicação"
                        value={year}
                        onChangeText={setYear}
                    />
                    <Text style={styles.label}>Edição</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a edição"
                        value={edition}
                        onChangeText={setEdition}
                    />
                    <Text style={styles.label}>Nº de Páginas</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o número de páginas"
                        value={pages}
                        onChangeText={setPages}
                    />
                    <Text style={styles.label}>ISBN</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o ISBN"
                        value={isbn}
                        onChangeText={setIsbn}
                    />
                    <Text style={styles.label}>Categorias</Text>
                    <CheckBox
                        title='Ficção'
                        checked={categories.fiction}
                        onPress={() => handleCheckboxChange('fiction')}
                    />
                    <CheckBox
                        title='Infantil e Juvenil'
                        checked={categories.juvenile}
                        onPress={() => handleCheckboxChange('juvenile')}
                    />
                    <CheckBox
                        title='Religião e Espiritualidade'
                        checked={categories.religion}
                        onPress={() => handleCheckboxChange('religion')}
                    />
                    <CheckBox
                        title='Artes e Fotografia'
                        checked={categories.arts}
                        onPress={() => handleCheckboxChange('arts')}
                    />
                    <CheckBox
                        title='Educação'
                        checked={categories.education}
                        onPress={() => handleCheckboxChange('education')}
                    />
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        placeholder="Digite a descrição"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#ac58aa' }]} onPress={handleCreateBook}>
                        <Text style={styles.buttonText}>Adicionar Livro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#ff6347' }]} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </ScrollView>
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
        marginTop: 55,
        marginBottom: -10
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
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 15,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    selectedRadio: {
        backgroundColor: "#000",
    },
    radioText: {
        fontSize: 16,
    },
});

export default AddBookScreen;