import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface Props {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    user: { firstName: string, lastName: string, email: string } | null;
    handleSettings: () => void;
    handleLogout: () => void;
}

const CustomModal: React.FC<Props> = ({ modalVisible, setModalVisible, user, handleSettings, handleLogout }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Olá {user ? user.firstName : "leitor"}!</Text>
                    <Text>Nome: {user ? `${user.firstName} ${user.lastName}` : ''}</Text>
                    <Text>Email: {user ? user.email : ''}</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={handleSettings}>
                        <Text style={styles.buttonText}>Configurações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        width: '75%',
        padding: 10,
        backgroundColor: '#ac58aa',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: '#ac58aa',
        fontSize: 16,
    },
});

export default CustomModal;