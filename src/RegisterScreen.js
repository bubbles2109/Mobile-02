import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { createAccount } from './components/handles'

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isEmpty, setIsEmpty] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  })
  const [isLoading, setIsLoading] = useState(false);

  const onPressBack = () => {
    navigation.goBack()
  }

  const onPressLoginNow = () => {
    navigation.navigate('Login')
  }

  const checkEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  };

  const checkEmpty = () => {
    return {
      username: username === '',
      email: email === '',
      password: password === '',
      confirmPassword: confirmPassword === '',
    };
  };

  const onPressRegister = async () => {
    const emptyFields = checkEmpty();
    const isValidEmail = checkEmailFormat(email);
    const isValidPassword = password === confirmPassword;

    setIsEmpty(emptyFields);
    setIsValidEmail(isValidEmail);
    setIsValidPassword(isValidPassword);
    if (!emptyFields.username && !emptyFields.email && !emptyFields.password && !emptyFields.confirmPassword && isValidEmail && isValidPassword) {
      setIsLoading(true)
      createAccount(username, email, password)
        .then(() => {
          setIsLoading(false)
          navigation.goBack()
        })
        .catch(() => {
          setIsLoading(false)
          Alert.alert('Notification', 'Registration failed, please check the connection again.')
        })
    }
    
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerDetails}>
          <TouchableOpacity style={styles.customButton} onPress={onPressBack}>
            <Text style={styles.backButton}>&#8826;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Hello! Register to get started</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder='Username' value={username} onChangeText={(text) => setUsername(text)}></TextInput>
          {isEmpty.username && <Text style={{ color: 'red', marginHorizontal: 20 }}>Username is empty</Text>}

          <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)}></TextInput>
          {(isEmpty.email && <Text style={{ color: 'red', marginHorizontal: 20 }}>Email is empty</Text>) || (!isValidEmail && <Text style={{ color: 'red', marginHorizontal: 20 }}>Wrong email format</Text>)}

          <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={(text) => setPassword(text)}></TextInput>
          {isEmpty.password && <Text style={{ color: 'red', marginHorizontal: 20 }}>Password is empty</Text>}

          <TextInput style={styles.input} placeholder='Confirm password' value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)}></TextInput>
          {isEmpty.confirmPassword && <Text style={{ color: 'red', marginHorizontal: 20 }}>ConfirmPassword is empty</Text> || !isValidPassword && <Text style={{ color: 'red', marginHorizontal: 20 }}>Confirm Password do not match Password.</Text>}

          <TouchableOpacity style={styles.registerButton} onPress={onPressRegister}>
            {isLoading ? (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="gray" />
              </View>
            ) : (
              <Text style={styles.textButton}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
          <View style={styles.innerViewLine}>
            <View style={styles.line} />
            <Text style={{ paddingHorizontal: 10 }}>Or Register with</Text>
            <View style={styles.line} />
          </View>
        </View>
        <View style={styles.innerViewOtherButton}>
          <TouchableOpacity style={styles.otherLoginButton}>
            <Image style={styles.image} resizeMode='contain' source={require('../asset/image/google.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherLoginButton}>
            <Image style={styles.image} resizeMode='contain' source={require('../asset/image/facebook.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherLoginButton}>
            <Image style={styles.image} resizeMode='contain' source={require('../asset/image/apple-logo.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Text>Already have an account? {''}
            <Text onPress={onPressLoginNow} style={{ textDecorationLine: 'underline', fontWeight: 'bold', color: '#09b44c' }}>Login now</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  )
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
  viewTitle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f7f8f8',
  },
  registerButton: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#09b44c',
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: '#09b44c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray'
},
innerViewLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20
},
innerViewOtherButton: {
    flexDirection: 'row', 
    marginHorizontal: 20, 
    justifyContent: 'space-between'
},
otherLoginButton: {
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#f7f8f8'
},
image: {
    height: 30,
    width: 30
}
})

export default Register;