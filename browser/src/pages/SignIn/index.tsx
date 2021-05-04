import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/DoEnglishLogo.png';
import { Container, Content, Background, FormContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha Obrigatória'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data);

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors({ [`${err.path}`]: err.message });
        }

        addToast({
          title: 'Não foi possível logar',
          description: 'Cheque as credenciais.',
          type: 'error',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <img src={logoImg} alt="DoEnglishLogo" width={210} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Login your account</h1>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Enter</Button>
            <Link to="/forgot-password">I forgot my password</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Create an account
          </Link>
        </FormContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
