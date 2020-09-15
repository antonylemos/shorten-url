import React from 'react';
import { View } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <View>
        <Title>Faça seu logon</Title>
      </View>

      <Input name="email" icon="mail" placeholder="E-mail" />

      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
