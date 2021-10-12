interface SigninContainerProps {
  token: any;
}

export const SigninContainer: React.FC<SigninContainerProps> = ({ token }) => {
  return (
    <div className="signin-container">
      <img
        className="mb-4"
        src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg"
        alt="icon"
        width="72"
        height="72"
      />

      <h1 className="h3 mb-3 font-weight-normal">Добро пожаловать!</h1>

      <p className="lead">Токен: {token}</p>
    </div>
  );
};
