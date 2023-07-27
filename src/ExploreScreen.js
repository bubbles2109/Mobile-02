import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    Dimensions
} from 'react-native';

const ExploreScreen = () => {
    const category = [
        { id: 1, image: require('../asset/image/hinh1.jpg'), title: 'Fruit & Vegetable' },
        { id: 2, image: require('../asset/image/hinh2.jpg'), title: 'Meat' },
        { id: 3, image: require('../asset/image/hinh3.jpg'), title: 'Fish' },
        { id: 4, image: require('../asset/image/hinh3.jpg'), title: 'Bottled Water' },
        { id: 5, image: require('../asset/image/hinh3.jpg'), title: 'Seafood' },
        { id: 6, image: require('../asset/image/hinh3.jpg'), title: 'Snack' },
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item}>
                    <Image style={styles.image} source={item.image} />
                    <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={category}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} />

        </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const calculatedWidth = screenWidth / 2 - 40;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        height: 120,
        width: 100,
    },
    item: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 0.5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: calculatedWidth,
        marginHorizontal: 5
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        padding: 10,
        textAlign: 'center'
    }
});

export default ExploreScreen;
