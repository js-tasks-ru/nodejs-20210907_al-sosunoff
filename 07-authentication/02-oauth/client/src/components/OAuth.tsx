import React, { Component } from 'react';
import { axios } from '../axios';
import { Link } from 'react-router-dom';
import { SigninContainer } from './SigninContainer';

interface State {
  token: string | null;
  error: any;
}

type Props = any;

export class OAuth extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: null,
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
        this.setState({
          token: response.data.token,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.response.data.error,
        });
      });
  }

  render() {
    const { token, error } = this.state;

    if (token) {
      return <SigninContainer token={token} />;
    }

    if (error) {
      return (
        <div className="signin-container">
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
            alt="icon"
            width="72"
            height="72"
          />
          
          <p className="lead">При выполнении аутентификации произошла ошибка</p>
          
          <div className="alert alert-danger" role="alert">
            {error}
          </div>

          <Link to="/" className="btn btn-lg btn-primary btn-block">
            Вход
          </Link>
        </div>
      );
    }

    return (
      <div className="signin-container">
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
          alt="icon"
          width="72"
          height="72"
        />
        <p className="lead">
          Пожалуйста, подождите — производится аутентификация через социальную
          сеть.
        </p>
      </div>
    );
  }
}
