import React, { useCallback, useRef, useState } from 'react';
import { TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import axios from 'axios';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../Button';
import Input from '../Input';

import { Container, Title } from './styles';
import api from '../../services/api';

interface BottomSheetProps {
  handleAddUrl(url: Record<string, unknown>): void;
}

interface UrlFormData {
  url: string;
}

const BottomSheetContainer: React.FC<BottomSheetProps> = ({ handleAddUrl }) => {
  const formRef = useRef<FormHandles>(null);
  const urlInputRef = useRef<TextInput>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const handleShortenUrl = useCallback(
    async (data: UrlFormData) => {
      try {
        setIsLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          url: Yup.string().required('Login obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await axios.get(
          `http://is.gd/create.php?format=json&url=${data.url}`,
        );

        const date = new Date();

        const newUrl = {
          idUsuario: user.id,
          curta: response.data.shorturl,
          original: data.url,
          data: date.toISOString(),
        };

        const url = await api.post('url', newUrl);

        handleAddUrl(url.data);

        Alert.alert('URL encurtada com sucesso!');

        setIsLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao adicionar URL',
          'Ocorreu um erro ao adicionar URL, tente novamente.',
        );

        setIsLoading(false);
      }
    },
    [user.id, handleAddUrl],
  );

  return (
    <Container>
      <Icon name="chevron-down" size={30} color="#999591" />

      <Title>Adicionar URL</Title>

      <Form ref={formRef} onSubmit={handleShortenUrl}>
        <Input
          ref={urlInputRef}
          autoCapitalize="none"
          autoCorrect={false}
          name="url"
          icon="link"
          placeholder="Url"
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />

        <Button
          onPress={() => {
            formRef.current?.submitForm();
          }}
        >
          {isLoading ? 'Carregando...' : 'Adicionar'}
        </Button>
      </Form>
    </Container>
  );
};

export default BottomSheetContainer;
