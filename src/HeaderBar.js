import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
      <Text style={styles.title}>Store</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    padding: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
  },
});

export default HeaderBar;