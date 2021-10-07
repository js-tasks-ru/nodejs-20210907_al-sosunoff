import React, { Component } from 'react';
import {axios} from '../axios'
import { SigninContainer } from './SigninContainer';
import { Provider } from '../../../controllers/oauth';

interface State {
  email: string;
  password: string;
  isLoading: boolean;
  error: any;
  token: any;
}

type Props = any;

export class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      token: null,
      isLoading: false,
      error: null,
    };
  }

  onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { email, password, isLoading } = this.state;

    if (isLoading) return;

    if (!email || !password) {
      this.setState({
        error: 'Поля email и пароль обязательные',
      });
      return;
    }

    this.setState({
      error: null,
      isLoading: true,
    });

    axios
      .post('/login', {
        email,
        password,
      })
      .then((response) => {
        this.setState({
          isLoading: false,
          token: response.data.token,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error: error.response.data.error,
        });
      });
  };

  getOAuthLink = (provider: Provider) => () => {
    this.setState({
      error: null,
      isLoading: true,
    });

    axios
      .get(`/oauth/${provider}`)
      .then((response) => {
        window.location.href = response.data.location;
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error: error.response.data.error,
        });
      });
  };

  onEmailChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onPasswordChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  render() {
    const { email, password, token, isLoading, error } = this.state;

    if (token) {
      return <SigninContainer token={token} />;
    }

    return (
      <>
        <form className="signin-container" onSubmit={this.onSubmit}>
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
            alt="icon"
            width="72"
            height="72"
          />

          <h1 className="h3 mb-3 font-weight-normal">Вход</h1>

          {!!error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <label htmlFor="inputEmail" className="sr-only">
            Email
          </label>

          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email"
            autoFocus
            disabled={isLoading}
            value={email}
            onChange={this.onEmailChanged}
          />

          <label htmlFor="inputPassword" className="sr-only">
            Пароль
          </label>

          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Пароль"
            disabled={isLoading}
            value={password}
            onChange={this.onPasswordChanged}
          />

          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={isLoading}
          >
            Войти
          </button>
        </form>

        <div className="social-buttons text-center">
          <p>или используйте социальные сети:</p>

          <button
            className="btn btn-link btn-lg text-info mx-2"
            onClick={this.getOAuthLink('facebook')}
          >
            <i className="fab fa-facebook-f" />
          </button>
          <button
            className="btn btn-link btn-lg text-info mx-2"
            onClick={this.getOAuthLink('vkontakte')}
          >
            <i className="fab fa-vk" />
          </button>
          <button
            className="btn btn-link btn-lg text-info mx-2"
            onClick={this.getOAuthLink('github')}
          >
            <i className="fab fa-github" />
          </button>
        </div>
      </>
    );
  }
}
