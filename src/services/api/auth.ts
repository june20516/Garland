import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { uploadImage } from './storage';
import { UserCredentials, User } from './types';

const registerUser = async ({
  email,
  password,
  name,
  ageRange,
  profileImg,
  specialties,
  interests,
}: User) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    let imageUrl = '';
    if (profileImg) {
      imageUrl = await uploadImage(profileImg, user.uid);
    }

    // 사용자 데이터 Firestore에 저장 (추가 정보 포함)
    await firestore().collection('users').doc(user.uid).set({
      email: user.email,
      name,
      ageRange,
      profileImg: imageUrl,
      specialties,
      interests,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const loginUser = async ({ email, password }: UserCredentials) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { registerUser, loginUser };
