import firestore from '@react-native-firebase/firestore';
import { User } from './types';

const getDocument = async <T>(
  collectionPath: string,
  docId: string,
): Promise<T> => {
  try {
    const docRef = firestore().collection(collectionPath).doc(docId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      return docSnapshot.data() as T;
    } else {
      throw new Error(`${collectionPath}::#${docId} not found`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUser = async (userId: string) => {
  try {
    return getDocument<User>('users', userId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

type UserUpdateProps = Partial<User> & { userId: string };

const updateUser = async ({
  userId,
  ...userInfo
}: UserUpdateProps): Promise<void> => {
  try {
    await firestore().collection('users').doc(userId).update(userInfo);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getUser, updateUser };
