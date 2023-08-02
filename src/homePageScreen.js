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
} from 'react-native';
import { fetchDataProduct, creatDataCart } from './components/handles';
import { useNavigation, useRoute } from '@react-navigation/native';
import userDataSingleton from './components/UserDataSingleTon';
import userIdDataSingleton from './components/UserIdDataSingleton';

const HomeScreen = () => {
  const [data, setData] = useState([])

  const slideRef = useRef(null);

  const navigation = useNavigation()

  const dataUser = userDataSingleton.getData()

  useEffect(() => {
    const getDataProduct = async () => {
      const dataRef = await fetchDataProduct()
      setData(dataRef)
      //console.log(dataRef)
    };

    console.log(dataUser)

    getDataProduct()
  }, [])

  const selectProduct = ( item ) => {
    navigation.push('DetailProduct', {item})
  }

  const onPressPlus = async(item) => {
    const userId = userIdDataSingleton.getData()
    await creatDataCart(item, userId)
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ padding: 10 }} activeOpacity={1} onPress={ () => selectProduct(item) }>
          <View style={[styles.slide, { flex: 1 }]}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <Text style={styles.titleItem}>{item.title}</Text>
          <Text>{item.weight}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Text style={styles.priceItem}>{item.price}$</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableOpacity style={styles.button} onPress={() => onPressPlus(item)}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold', padding: 10 }}>Exclusive Offer</Text>
          <View style={{ height: 280 }}>
            <FlatList
              //ref={slideRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold', padding: 10 }}>Best Selling</Text>
          <FlatList
            //ref={slideRef}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  image: {
    height: 150,
    width: 150,
  },
  slide: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10
  },
  titleItem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  priceItem: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
  },
  button: {
    backgroundColor: 'green',
    alignSelf: 'center',
    borderRadius: 10
  },
  plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 15,
  }
});

export default HomeScreen;
