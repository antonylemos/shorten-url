import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Url } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: 48px;
  background: #1e242c;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #999591;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #f2a365;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const UrlsList = styled(FlatList as new () => FlatList<Url>)`
  height: 50px;
  padding: 32px 24px 16px;
`;

export const UrlsListContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const UrlsListTitle = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const UrlsListButton = styled(RectButton)`
  height: 40px;
  width: 40px;
  background: #f2a365;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const UrlContainer = styled.View`
  background: #30475e;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UrlInfo = styled.View`
  flex: 1;
`;

export const UrlName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const UrlMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const UrlMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
`;

export const UrlActionButton = styled(RectButton)`
  height: 100%;
  width: 40px;
  border-radius: 10px;
  background: #ff4b5c;
  justify-content: center;
  align-items: center;
`;
