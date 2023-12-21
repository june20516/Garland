import { View, Text } from 'react-native';
import Section from 'components/common/Section';

const Home: React.FC = () => {
  return (
    <View>
      <Section title={'홈'}>
        <Text>홈 화면 입니다</Text>
      </Section>
    </View>
  );
};

export default Home;
