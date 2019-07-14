/*
__Seed builder__v1.0
*/

import * as React from 'react';
import * as DataUtil from 'seed/util/DataUtil';
import cx from 'classnames';
import redux from 'seed/helpers/redux';
import { Formik, Field } from 'formik';

import Loading from 'components/helpers/Loading';

import styles from 'resources/css/users/Form.module.css';

class UserForm extends React.Component
{
  render()
  {
    const { user = {} } = this.state;
    const { filters } = this.state;
    const userId = this.getUserId();
    if (user.id == null && userId != null) return <Loading />;
    
    return (
      <div className={styles.module}>

        <div className={styles.header}>
          User
        </div>

        <div className={styles.form}>

          <Formik
            initialValues={user}
            validate={this.onValidate}
            onSubmit={this.onSubmit}>
          {({
            values,
            errors,
            handleSubmit
          }) => (

          <form onSubmit={handleSubmit}>

            {/* Suggested divs */}

            {this.renderError()}

            <button type="submit" className={styles.submit}>Send</button>

          </form>
          )}
          </Formik>
        </div>
      </div>
    );
  }

  renderError()
  {
    const { error } = this.state;
    return ( 
    error ? <div className={styles.error}>{error}</div> : null
    );
  }

  /*
  * Component logic
  */

  constructor(props)
  {
    super(props);
    this.state = {
      user: {
      },
      filters: {
        user_id: this.getUserId(), 
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  componentDidMount()
  {
    this.loadData();
    this.loadFkData();
  }

  /* Events */

  onSave(res)
  {
    //Suggested method
    this.props.onClose();
  }

  onError(error)
  {
    //Suggested method
    this.setState({
      error: 'An error has occurred, try again'
    });
  }

  onSubmit(values, { setSubmitting })
  {
    let user = this.state.user ? this.state.user : {};

    this.setState({
      user: user
    });
    this.saveData();
  }

  onValidate()
  {
  }

  /* Actions */

  loadData = () =>
  {
    const { getUserDetails } = this.props;
    const userId = this.getUserId();
    if (userId != null) {
      const callback = res => 
      {
        const userId = this.getUserId();
        const user = DataUtil.getItem(this.props.users, userId);
        if (user.id != null)
          this.setState({
            user: Object.assign({}, this.state.user, user)
          })
      }
      getUserDetails(userId, callback);
    }
  }

  loadFkData = () => 
  {
  }

  saveData = () =>
  {
    const { saveUser, setUser } = this.props;
    const userId = this.getUserId();
    const onSave = res => 
    {
      if (res.ok) this.onSave(res.body);
      else this.onError(res.body)
    };
    if (userId == null && saveUser != null)
      saveUser(this.state.user, onSave)
    if (userId != null && setUser != null)
      setUser(userId, this.state.user, onSave);
  }

  /* Args */

  getUserId() 
  {
    const { user_id } = this.props.match.params;
    const { userId } = this.props;
    return user_id ? user_id : userId;
  }

  /* Filters */

  getUserId()
  {
    const { user_id } = this.props.match.params;
    const { userId } = this.props;
    return user_id == 0 ? sessionStorage.getItem('id') : 
           user_id ? user_id : 
           userId;
  }
}

export default redux(UserForm);
