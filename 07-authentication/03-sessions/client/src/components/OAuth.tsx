import React, { Component } from 'react';
import { axios } from '../axios';
import { Link, Redirect } from 'react-router-dom';
import { SigninContainer } from './SigninContainer';

interface State {
  success: boolean;
  error: any;
}

type Props = any;

export class OAuth extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      success: false,
      error: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);

    axios
      .post(`/oauth_callback?code=${params.get('code')}`, {
        provider: this.props.match.params.provider,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);

        this.setState({
          success: true,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.response.data.error,
        });
      });
  }

  render() {
    const { success, error } = this.state;

    if (success) {
      return <Redirect to="/" />;
    }

    if (error) {
      return (
        <SigninContainer>
          <p className="lead">При выполнении аутентификации произошла ошибка</p>

          <div className="alert alert-danger" role="alert">
            {error}
          </div>

          <Link to="/" className="btn btn-lg btn-primary btn-block">
            Вход
          </Link>
        </SigninContainer>
      );
    }

    return (
      <SigninContainer>
        <p className="lead">
          Пожалуйста, подождите — производится аутентификация через социальную
          сеть.
        </p>
      </SigninContainer>
    );
  }
}
