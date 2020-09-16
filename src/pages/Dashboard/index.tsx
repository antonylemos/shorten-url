import React, { useCallback, useEffect, useRef, useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import BottomSheetContainer from '../../components/BottomSheetContainer';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  UrlsList,
  UrlsListContainer,
  UrlsListTitle,
  UrlsListButton,
  UrlContainer,
  UrlInfo,
  UrlName,
  UrlMeta,
  UrlMetaText,
  UrlActionButton,
} from './styles';

export interface Url {
  id: string;
  curta: string;
  data: string;
  original: string;
}

const Dashboard: React.FC = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [isActive, setIsActive] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get(`url/listar/${user.id}`).then(response => {
      setUrls(response.data);
    });
  }, [user.id]);

  const handleAddUrl = useCallback(
    newUrl => {
      setUrls([...urls, newUrl]);
    },
    [urls],
  );

  const handleDeleteUrl = useCallback(
    async id => {
      await api.delete(`url/${id}`);

      setUrls(urls.filter(url => url.id !== id));
    },
    [urls],
  );

  // const navigateToProfile = useCallback(() => {
  //   navigate('Profile');
  // }, [navigate]);

  // const navigateToShortenUrl = useCallback(() => {
  //   navigate('ShortenUrl');
  // }, [navigate]);

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>
            Bem-vindo,
            {'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>

          <ProfileButton onPress={() => {}}>
            <UserAvatar
              source={{
                uri: 'https://api.adorable.io/avatars/285/abott@adorable.png',
              }}
            />
          </ProfileButton>
        </Header>

        <UrlsList
          data={urls}
          keyExtractor={url => `${url.id}`}
          ListHeaderComponent={() => (
            <UrlsListContainer>
              <UrlsListTitle>Urls</UrlsListTitle>
              <UrlsListButton
                onPress={() =>
                  isActive
                    ? sheetRef.current?.snapTo(1)
                    : setIsActive(!isActive)
                }
              >
                <Icon name="plus" size={20} color="#222831" />
              </UrlsListButton>
            </UrlsListContainer>
          )}
          renderItem={({ item: url }) => (
            <UrlContainer>
              <UrlInfo>
                <UrlName>{url.curta}</UrlName>

                <UrlMeta>
                  <Icon name="link" size={14} color="#f2a365" />
                  <UrlMetaText>{url.original}</UrlMetaText>
                </UrlMeta>

                <UrlMeta>
                  <Icon name="calendar" size={14} color="#f2a365" />
                  <UrlMetaText>{url.data}</UrlMetaText>
                </UrlMeta>
              </UrlInfo>

              <UrlActionButton onPress={() => handleDeleteUrl(url.id)}>
                <Icon name="trash" size={24} color="#222831" />
              </UrlActionButton>
            </UrlContainer>
          )}
        />
      </Container>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={() =>
          isActive ? <BottomSheetContainer handleAddUrl={handleAddUrl} /> : null
        }
      />
    </>
  );
};

export default Dashboard;
