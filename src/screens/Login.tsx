import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { loginUser } from 'services/api/auth';
import { UserCredentials } from 'services/api/types';
import { NavigatableScreenProps } from 'src/navigation/props';

const Login: React.FC<NavigatableScreenProps<'Login'>> = ({ navigation }) => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const user = await loginUser(credentials);
      Alert.alert('로그인 성공', `환영합니다, ${user.email}!`);
      // 로그인 성공 후 처리
    } catch (error: any) {
      Alert.alert('로그인 실패', error.message);
    }
  };

  const handleJoin = async () => {
    navigation.navigate('Join');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>여기는 로그인 페이지</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={credentials.email}
        onChangeText={text => setCredentials({ ...credentials, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={credentials.password}
        onChangeText={text =>
          setCredentials({ ...credentials, password: text })
        }
        secureTextEntry
      />
      <Button title="로그인" onPress={handleLogin} />
      <Button title="가입" onPress={handleJoin} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default Login;
