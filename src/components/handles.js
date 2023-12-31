import firestore from '@react-native-firebase/firestore'

export const fetchDataProduct = async() => {
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

export const creatDataCart = async(item, userId) => {
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

export const fetchDataCart = async(userId) => {
    try {
        const respone = await firestore().collection('user').doc(userId).collection('cart').get()
        const dataRef = respone.docs.map((doc) => doc.data())
        return dataRef
    } catch (error) {
        console.log(error)
    }
}

export const deleteDocumentByProductId = async(itemId, userId) => {
    try {
      const collectionRef = firestore().collection('user').doc(userId).collection('cart');
  
      // Sử dụng truy vấn (query) để tìm document có trường "productId" bằng giá trị được cung cấp
      const querySnapshot = await collectionRef.where('id', '==', itemId).get();
  
        // Lấy reference đến document cần xóa
        const docRef = querySnapshot.docs[0].ref;
        await docRef.delete();
  
        console.log('Document has been deleted successfully!');
    } catch (error) {
      console.error(error);
    }
}

export const createAccount = async(username, email, password) => {
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

export const getDataUser = async(email, password) => {
    try {
        const response = await firestore().collection('account').where('email ==', email).where('password ==', password).get()
        if (!response.empty){
            const userData = response.docs[0].data();
            return userData
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}