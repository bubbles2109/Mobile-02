import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getDataAccount } from './components/handles';
import userDataSingleton from './components/UserDataSingleton';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onPressRegister = () => {
        navigation.navigate('Register')
        console.log('click')
    }

    const onPressLogin = () => {
        if (email != '' && password != '') {
            getDataAccount(email, password)
            .then( async(data) => {
                await userDataSingleton.setData(data)
                console.log(data)
                navigation.navigate('MainContainer', {reload: true})
            })
        }
    }

    const onPressBack = () => {
        navigation.goBack()
    }

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
                <TouchableOpacity style={{position: 'absolute', zIndex: 1, paddingHorizontal: 20, paddingVertical: 10}} onPress={onPressBack}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>&#8826;</Text>
                </TouchableOpacity>
                <View style={styles.innerContainer}>
                    <Image style={styles.logo} resizeMode='contain' source={require('../asset/image/logo.jpg')} />
                </View>
                <View>
                    <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)}></TextInput>
                    <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={(text) => setPassword(text)}></TextInput>
                    <TouchableOpacity style={styles.loginButton} onPress={onPressLogin}>
                        <Text style={styles.textButton}>Login</Text>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                        <View style={styles.innerViewLine}>
                            <View style={styles.line} />
                            <Text style={{ paddingHorizontal: 10 }}>Or Login with</Text>
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
                        <Text>Do not have an account? {''}
                            <Text onPress={onPressRegister} style={{ textDecorationLine: 'underline', fontWeight: 'bold', color: '#09b44c' }}>Register now</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 250
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
    loginButton: {
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

export default LoginScreen;