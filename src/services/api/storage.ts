import storage from '@react-native-firebase/storage';

const uploadImage = async (
  imageUri: string,
  userId: string,
): Promise<string> => {
  const fileName = `profile_${userId}`;
  const reference = storage().ref(fileName);

  await reference.putFile(imageUri);

  const url = await reference.getDownloadURL();
  return url;
};

export { uploadImage };
