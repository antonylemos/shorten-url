import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import BottomSheetContainer from '../../components/BottomSheetContainer';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  LogoutButton,
  UrlsList,
  UrlsListContainer,
  UrlsListTitle,
  UrlsListButton,
  UrlContainer,
  UrlInfo,
  UrlName,
  UrlMeta,
  UrlMetaText,
  UrlActionButtonContainer,
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

  const sheetRef = useRef<BottomSheet>(null);

  const { user, signOut } = useAuth();

  useEffect(() => {
    sheetRef.current?.snapTo(2);
  }, []);

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

  return (
    <>
      <Container>
        <Header>
          <HeaderTitle>
            Bem-vindo,
            {'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>

          <LogoutButton onPress={signOut}>
            <Icon name="log-out" size={30} color="#f2a365" />
          </LogoutButton>
        </Header>

        <UrlsList
          data={urls}
          keyExtractor={url => `${url.id}`}
          ListHeaderComponent={() => (
            <UrlsListContainer>
              <UrlsListTitle>Urls</UrlsListTitle>
              <UrlsListButton onPress={() => sheetRef.current?.snapTo(1)}>
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

              <UrlActionButtonContainer>
                <UrlActionButton
                  onPress={() => handleDeleteUrl(url.id)}
                  style={{ marginRight: 8, backgroundColor: '#ff4b5c' }}
                >
                  <Icon name="trash" size={24} color="#222831" />
                </UrlActionButton>
                <UrlActionButton
                  onPress={() => Linking.openURL(url.curta)}
                  style={{ backgroundColor: '#f2a365' }}
                >
                  <Icon name="external-link" size={24} color="#222831" />
                </UrlActionButton>
              </UrlActionButtonContainer>
            </UrlContainer>
          )}
        />
      </Container>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        initialSnap={1}
        renderContent={() => (
          <BottomSheetContainer handleAddUrl={handleAddUrl} />
        )}
      />
    </>
  );
};

export default Dashboard;
