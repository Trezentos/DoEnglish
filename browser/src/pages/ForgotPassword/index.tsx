import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/DoEnglishLogo.png';
import { Container, Content, Background, FormContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface SignInFormData {
  email: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Type a valid e-mail'),
        });

        await schema.validate(data);

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          title: 'We send you an email verification!',
          description: 'Please, check your messages box on your email!',
          type: 'success',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors({ [`${err.path}`]: err.message });
          return;
        }

        if (err) {
          addToast({
            title: 'Something went wrong...',
            description: 'It seen that your email is incorrect',
            type: 'error',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <img src={logoImg} alt="DoEnglishLogo" width={210} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Enter your email to reset your password</h2>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />

            <Button loading={loading} type="submit">
              Enter
            </Button>
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
export default SignIn;
