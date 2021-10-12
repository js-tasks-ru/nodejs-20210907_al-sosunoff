import React, { Component } from 'react';
import { axios } from '../axios';
import { Link } from 'react-router-dom';

interface State {
  success: boolean;
  error: any;
}

type Props = any;

export class Confirmation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      success: false,
      error: null,
    };
  }

  async componentDidMount() {
    const token = this.props.match.params.token;

    try {
      await axios.post('/confirm', {
        verificationToken: token,
      });

      this.setState({
        success: true,
      });
    } catch (error: any) {
      this.setState({
        error: error.response.data.error,
      });
    }
  }

  render() {
    const { success, error } = this.state;

    if (success) {
      return (
        <div className="text-center border border-light p-5">
          <p className="h4 mb-4">
            Поздравляем, ваш почтовый адрес успешно подтвержден!
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center border border-light p-5">
          <p className="text-danger">
            При выполнени операции произошла ошибка.
          </p>
          
          <p className="text-danger">{error}</p>
          <Link to="/">Регистрация</Link>
        </div>
      );
    }

    return (
      <div className="row login-form justify-content-center align-items-center">
        <div className="col col-md-6">
          <div className="text-center border border-light p-5">
            <p className="h4 mb-4">Подтверждение почтового адреса</p>

            <p>Почтовый адрес подтверждается, пожалуйста, подождите.</p>
            
            <div className="spinner-border" role="status">
              <span className="sr-only">Загрузка...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
