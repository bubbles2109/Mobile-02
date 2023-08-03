import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HeaderBar = ({ showHeader, title, searchText, setSearchText }) => {
  if (!showHeader) {
    return null
  }
  const handleSearch = () => {
    // Xử lý tìm kiếm dựa trên searchText
    console.log(searchText)
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Store"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Image
        style={styles.searchIcon}
        source={require('../asset/image/search.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});

export default HeaderBar;