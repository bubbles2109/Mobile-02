import firestore from '@react-native-firebase/firestore'

export const fetchDataProduct = async () => {
    try {
        const respone =
            await firestore()
                .collection('products')
                .get()
        const dataRef = respone.docs.map((doc) => doc.data())
        return dataRef
    } catch (error) {
        console.log(error)
    }
}

export const creatDataCart = async (item, userId) => {
    try {
        const cartRef =
            await firestore()
                .collection('user')
                .doc(userId)
                .collection('cart')
        const docRef = await cartRef.add(item);
        return docRef
    } catch (error) {
        console.log(error)
    }
}

export const fetchDataCart = async (userId) => {
    try {
        const respone = await firestore().collection('user').doc(userId).collection('cart').get()
        const dataRef = respone.docs.map((doc) => doc.data())
        return dataRef
    } catch (error) {
        console.log(error)
    }
}

export const deleteDocumentByProductId = async (itemId, userId) => {
    try {
        const collectionRef = firestore().collection('user').doc(userId).collection('cart');
        const querySnapshot = await collectionRef.where('id', '==', itemId).get();

        const docRef = querySnapshot.docs[0].ref;
        await docRef.delete();

        console.log('Document has been deleted successfully!');
    } catch (error) {
        console.error(error);
    }
}

export const createAccount = async (username, email, password) => {
    try {
        const newAccountRef = await firestore().collection('account').add({
            email: email,
            password: password
        });
        const newUserRef = await firestore().collection('user').add({
            address: '',
            age: '',
            email: email,
            image: '',
            name: username
        })

        console.log('User added! Document ID:', newAccountRef.id);
    } catch (error) {
        console.log(error)
    }
}

export const getDataAccount = async (email, password) => {
    try {
        const response = await firestore().collection('account').where('email', '==', email).where('password', '==', password).get()
        if (!response.empty) {
            const userData = response.docs[0].data();
            return userData
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProfileUser = async (email) => {
    try {
        const response = await firestore().collection('user').where('email', '==', email).get()
        const profileData = response.docs[0].data()
        const profileId = response.docs[0].id
        return { profileData, profileId }
    } catch (error) {
        console.log(error)
    }
}

export const createBill = async (userId, items) => {
    try {
        const newBillRef = await firestore().collection('bill').add({
            user: userId,
            items: items,
            createdAt: firestore.FieldValue.serverTimestamp()
        })
        console.log('Created Bill success')
    } catch (error) {
        console.log('Error creating bill:', error)
    }
}

export const deleteCart = async (userId) => {
    try {
        const cartRef = firestore().collection('user').doc(userId).collection('cart');
        const cartSnapshot = await cartRef.get();

        const deletePromises = [];
        cartSnapshot.forEach((doc) => {
            deletePromises.push(doc.ref.delete());
        });

        await Promise.all(deletePromises);
    } catch (error) {
        console.log(error)
    }
}

export const checkProductCart = async (userId, productId) => {
    try {
        const cartData = await fetchDataCart(userId)
        const isProductInCart = cartData.some(item => item.id === productId);

        return isProductInCart;
    } catch (error) {
        console.log(error);
        return false
    }
}