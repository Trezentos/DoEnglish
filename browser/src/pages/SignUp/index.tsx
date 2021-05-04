import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLock, FiUser, FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import LogoImg from '../../assets/DoEnglishLogo.png';
import Input from '../../components/Input';
// import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

import { Container, Background, Content, FormContainer } from './styles';
import Button from '../../components/Button';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
          ),
          password: Yup.string()
            .required('Senha Obrigatória')
            .min(6, 'É preciso no mínimo ter 6 caractéres.'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          name: Yup.string()
            .required('Nome de usuário obrigatório.')
            .min(5, 'É preciso no mínimo ter 5 caractéres.'),
        });

        await schema.validate(data);

        await api.post('/users', data);

        addToast({
          title: 'Conta criada com sucesso',
          description: 'Você já pode entrar com ela',
          type: 'success',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors({ [`${err.path}`]: err.message });
        }
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Background />

      <Content>
        <FormContainer>
          <img src={LogoImg} alt="DoEnglish Logo" width={150} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Create your account!</h1>
            <Input
              name="name"
              icon={FiUser}
              placeholder="User name"
              type="text"
            />
            <Input
              name="email"
              icon={FiMail}
              placeholder="Your e-mail"
              type="email"
            />
            <Input
              name="password"
              icon={FiLock}
              placeholder="Your password"
              type="password"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirm your password"
              type="password"
            />
            <Button type="submit">Create</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Back to login
          </Link>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
