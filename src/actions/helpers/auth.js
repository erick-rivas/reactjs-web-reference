import Executor from 'actions/helpers/executor'

class Auth extends Executor
{
  constructor()
  {
    super(
      `AUTH`,
      `auth`,
      state => state.auth
    )
  }

  login = (email, password, callback) =>
  {
    const onLogin = res =>
    {
      sessionStorage.setItem('token', res.key);
      callback(res);
    }

    const body = {
      email: email,
      password: password
    }

    return this.request(
      `auth/login/`, this.onLogin, onLogin, 'POST', body);
  }

  logout = callback => 
  {
    const onLogout = res =>
    {
      sessionStorage.removeItem('token');
      callback();
    }

    return this.request(
      `auth/logout/`, this.onLogout, onLogout, 'POST', {});
  }

  onLogin = data => ({
    type: `${this.id}_LOGIN`,
    data: data
  });

  onLogout = () => ({
    type: `${this.id}_LOGOUT`
  });

}

export default Auth;