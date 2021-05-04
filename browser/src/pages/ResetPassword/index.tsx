import React, { useCallback, useRef } from 'react';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useLocation, useHistory, Link } from 'react-router-dom';
import logoImg from '../../assets/DoEnglishLogo.png';
import { Container, Content, Background, FormContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface SignInFormData {
  password: string;
  password_confirmartion: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória.'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data);

        const { password, password_confirmartion } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmartion,
          token,
        });

        addToast({
          title: 'Your password had been changed!',
          description: 'No you can signin with your new password',
          type: 'success',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors({ [`${err.path}`]: err.message });
        }

        addToast({
          title: 'It was not possible to reset',
          description:
            'Check the credentials or try to resend the password reset to your e-mail',
          type: 'error',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <img src={logoImg} alt="DoEnglishLogo" width={210} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Change your password</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New Password"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirm Your New Password"
            />

            <Button type="submit">Change Password</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Back to signin
          </Link>
        </FormContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default ResetPassword;
