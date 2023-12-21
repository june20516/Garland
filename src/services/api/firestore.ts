import firestore from '@react-native-firebase/firestore';
import { User } from './types';

const getUser = async (userId: string) => {
  try {
    const userDocument = await firestore()
      .collection('users')
      .doc(userId)
      .get();
    if (userDocument.exists) {
      return userDocument.data();
    } else {
      throw new Error('User not found');
    }
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
