import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClearStorageScreen = () => {
    useEffect(() => {
        const clearAsyncStorage = async () => {
            try {
                await AsyncStorage.clear();
                console.log('AsyncStorage has been cleared!');
            } catch (error) {
                console.log('Error clearing AsyncStorage:', error);
            }
        };

        clearAsyncStorage();
    }, []);

    return (
        <View>
            <Text>AsyncStorage has been cleared!</Text>
        </View>
    );
};

export default ClearStorageScreen;