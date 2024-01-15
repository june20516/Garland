import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface StackParamList extends ParamListBase {}

export interface NavigatableScreenProps<T extends string> {
  navigation: StackNavigationProp<StackParamList, T>;
}
