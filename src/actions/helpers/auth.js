/*
__Seed builder__v1.0
  (Read_only) Builder helper
*/

import Action from 'sbuild/helpers/action'

class Auth extends Action
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
      sessionStorage.setItem('token', res.body.key);
      sessionStorage.setItem('id', res.body.user);
      callback(res);
    }

    const body = {
      email: email,
      password: password
    }

    return this.reqPost(
      `/login`, body, this.onLogin, onLogin);
  }

  logout = callback => 
  {
    const onLogout = res =>
    {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      callback(res);
    }

    return this.reqPost(
      `/logout`, {}, this.onLogout, onLogout);
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