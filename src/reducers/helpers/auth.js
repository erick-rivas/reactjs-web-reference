import Actions from 'actions/helpers/auth'
import Reducer from 'reducers/helpers/reducer'

class Auth extends Reducer
{
  constructor()
  {
    super(new Actions());
  }

  reducer = (state, action) =>
  {
    const type = action.type;

    if (type === `${this.ref.id}_LOGIN`)
      return Object.assign({}, state, {
        user: action.data.user
      });

    if (type === `${this.ref.id}_LOGOUT`)
      return Object.assign({}, state, {
        user: null
      });

    return this.baseReducer(state, action);
  }
}

export default Auth;