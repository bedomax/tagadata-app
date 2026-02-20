import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ArticleDetail: { article: import('../types').Article };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ArticleDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ArticleDetail'>;
