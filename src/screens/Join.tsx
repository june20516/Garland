import React, { useState } from 'react';

import { Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Interest, Specialty, User } from 'services/api/types';

const Join: React.FC = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    name: '',
    ageRange: undefined,
    major: undefined,
    profileImg: undefined,
    specialties: [],
    interests: [],
    core: {
      displayName: null,
      email: null,
      phoneNumber: null,
      uid: '',
    },
  });

  const handleInputChange = (field: keyof User, value: any) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  // Specialty와 Interest 선택을 위한 상태
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>(
    [],
  );
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);

  const handleSpecialtyChange = (itemValue: Specialty) => {
    setSelectedSpecialties(prev => [...prev, itemValue]);
  };

  const handleInterestChange = (itemValue: Interest) => {
    setSelectedInterests(prev => [...prev, itemValue]);
  };

  const handleRegister = () => {
    // 회원가입 로직 구현
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="이메일"
        value={user.email}
        onChangeText={value => handleInputChange('email', value)}
      />
      <TextInput
        placeholder="비밀번호"
        value={user.password}
        secureTextEntry
        onChangeText={value => handleInputChange('password', value)}
      />
      <TextInput
        placeholder="이름"
        value={user.name}
        onChangeText={value => handleInputChange('name', value)}
      />
      <Text>전문 분야</Text>
      <Picker
        selectedValue={selectedSpecialties[selectedSpecialties.length - 1]}
        onValueChange={(itemValue: Specialty) =>
          handleSpecialtyChange(itemValue as Specialty)
        }>
        {Object.values(Specialty).map(specialty => (
          <Picker.Item key={specialty} label={specialty} value={specialty} />
        ))}
      </Picker>

      <Text>관심사</Text>
      <Picker
        selectedValue={selectedInterests[selectedInterests.length - 1]}
        onValueChange={(itemValue: Interest) =>
          handleInterestChange(itemValue as Interest)
        }>
        {Object.values(Interest).map(interest => (
          <Picker.Item key={interest} label={interest} value={interest} />
        ))}
      </Picker>
      <Button title="회원가입" onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
});

export default Join;
