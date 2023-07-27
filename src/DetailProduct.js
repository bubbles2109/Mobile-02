import { useNavigation, useRoute } from '@react-navigation/native';
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
  TextInput,
} from 'react-native';

const DetailProductScreen = ({ navigation }) => {

  const route = useRoute();
  const { item } = route.params;

  const [amount, setAmount] = useState(1);
  const [isProductDetailExpanded, setIsProductDetailExpanded] = useState(false);
  const [isNutritionExpanded, setIsNutritionExpanded] = useState(false);

  const displayTextDetail = isProductDetailExpanded ? item.productDetail : '';
  const displayTextNutrition = isNutritionExpanded ? item.nutrition : '';

  const selectBackBtn = () => {
    navigation.goBack()
  }

  const addAmount = () => {
    setAmount(amount + 1)
  }

  const decreaseAmount = () => {
    setAmount(amount - 1)
  }

  const truncateProductDetail = () => {
    setIsProductDetailExpanded(!isProductDetailExpanded);
  }

  const truncateNutrition = () => {
    setIsNutritionExpanded(!isNutritionExpanded);
  }

  const onPressAddToCart = () => {

  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerDetails}>
        <TouchableOpacity style={styles.customButton} onPress={selectBackBtn}>
          <Text style={styles.backButton}>&#8826;</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={{flex: 1}}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#f2f3f2', width: '100%'}}>
              <Image style={{width: '100%', height: 200}} resizeMode='contain' source={{ uri: item.image }} />
            </View>
          </View>
          <View style={{ flex: 2, padding: 20 }}>
            <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ fontSize: 15 }}>{item.weight}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                  <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={decreaseAmount}><Text style={{ fontSize: 40, }}>&#8722;</Text></TouchableOpacity>
                  <TextInput style={{ borderWidth: 1, width: 40, borderRadius: 10, textAlign: 'center', color: 'black' }} value={amount.toString()} editable={false}></TextInput>
                  <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={addAmount}><Text style={{ fontSize: 40, color: 'green' }}>+</Text></TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>{item.price}$</Text>
              </View>
            </View>
            <View style={{ borderTopWidth: 0.5, borderTopColor: 'gray' }}>
              <TouchableOpacity onPress={truncateProductDetail} style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Product Detail</Text>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{isProductDetailExpanded ? '\u22CE' : '\u227B'}</Text>
              </TouchableOpacity>

              {isProductDetailExpanded && (
                <View>
                  {displayTextDetail.split('/n').map((line, index) => (
                    <Text key={index}>{line}</Text>
                  ))}
                </View>
              )}
            </View>
            <View style={{ borderTopWidth: 0.5, borderTopColor: 'gray' }}>
              <TouchableOpacity onPress={truncateNutrition} style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>Nutrition</Text>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{isNutritionExpanded ? '\u22CE' : '\u227B'}</Text>
              </TouchableOpacity>

              {isNutritionExpanded && (
                <View>
                  {displayTextNutrition.split('/n').map((line, index) => (
                    <Text key={index}>{line}</Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{height: 80, bottom: 0, backgroundColor: 'white'}}>
        <TouchableOpacity style={styles.addToCartButton} onPress={onPressAddToCart}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerDetails: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  customButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10
  },
  backButton: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    height: 400,
    width: 250,
  },
  slide: {
    paddingEnd: 20
  },
  addToCartButton: {
    flex: 1, 
    marginHorizontal: 20, 
    marginVertical: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: '#09b44c'
  }
});

export default DetailProductScreen;
