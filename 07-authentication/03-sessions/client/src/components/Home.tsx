import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axios } from '../axios';
import { SigninContainer } from './SigninContainer';

interface State {
  isLoading: boolean;
  error: any;
  profile: any;
}

type Props = any;

export class Home extends Component<Props, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      isLoading: true,
      error: null,
      profile: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.setState({
        isLoading: false,
        error:
          'Token не найден, для получения профиля, пожалуйста, аутентифицируйтесь.',
      });
      return;
    }

    axios
      .get('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({
          isLoading: false,
          profile: response.data,
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');

          this.setState({
            isLoading: false,
            error:
              'Неверный токен для получения профиля, пожалуйста, аутентифицируйтесь заново.',
          });
          
          return;
        }

        this.setState({
          isLoading: false,
          error: error.response.data.error,
        });
      });
  }

  onLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  render() {
    const { isLoading, error, profile } = this.state;

    if (isLoading) {
      return (
        <SigninContainer>
          <p className="lead">
            Пожалуйста, подождите, ваш профиль загружается.
          </p>
        </SigninContainer>
      );
    }

    if (error) {
      return (
        <SigninContainer>
          <p className="lead">При загрузке профиля произошла ошибка</p>

          <div className="alert alert-danger" role="alert">
            {error}
          </div>

          <Link to="/login" className="btn btn-lg btn-primary btn-block">
            Вход
          </Link>
        </SigninContainer>
      );
    }

    return (
      <SigninContainer>
        <h1 className="h3 mb-3 font-weight-normal">Добро пожаловать!</h1>

        <p className="lead">email: {profile.email}</p>

        <p className="lead">displayName: {profile.displayName}</p>

        <button
          onClick={this.onLogout}
          className="btn btn-lg btn-primary btn-block"
        >
          Выход
        </button>
      </SigninContainer>
    );
  }
}
