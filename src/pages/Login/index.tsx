import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content, Background, Form, FormActions } from './styles';
import { AuthContext } from '../../context/auth';
import ICredentialsDev from '../../context/credentialsDev';
import Footer from '../../components/Footer';

const SigninDev: React.FC = () => {
  const history = useHistory();

  const { user, signInDev } = useContext(AuthContext);

  const [model, setModel] = useState<ICredentialsDev>({
    email: '',
    password: '',
  });

  const updateModel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setModel({
        ...model,
        [e.target.name]: e.target.value,
      });
    },
    [model],
  );

  const onSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await signInDev(model);
        store.addNotification({
          title: 'Sucesso!',
          message: 'Usuário Autenticado com sucesso!',
          type: 'success',
          insert: 'top',
          container: 'top-center',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 2000,
          },
        });
        history.push('/snackcontrol/home');
      } catch (err) {
        store.addNotification({
          title: 'Error!',
          message: 'Falha ao autenticar usuário',
          type: 'danger',
          insert: 'top',
          container: 'top-center',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 2000,
          },
        });
      }
    },
    [history, model, signInDev],
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Container>
      <Background />
      <Content>
        <Form onSubmit={onSubmit}>
          <h1>Faça seu login</h1>
          <Input
            icon={FaEnvelope}
            placeholder="Email"
            type="email"
            name="email"
            value={model.email}
            onChange={updateModel}
            autoComplete="off"
          />
          <Input
            icon={FaLock}
            placeholder="Senha"
            isPassword
            type="password"
            name="password"
            value={model.password}
            onChange={updateModel}
            autoComplete="off"
          />
          <Button type="submit">Entrar</Button>
          {/*<FormActions>
            <Link to="/sign-up/dev">Faça seu cadastro</Link>
            <Link to="/">Voltar</Link>
          </FormActions>*/}
        </Form>
      </Content>
      <Footer />
    </Container>
  );
};

export default SigninDev;
