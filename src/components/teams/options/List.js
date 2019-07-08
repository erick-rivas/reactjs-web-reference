/*
__Seed builder__v1.0
*/

import * as React from 'react';
import cx from 'classnames';

import { Link } from 'react-router-dom';

import Component from 'components/teams/options/List.link';

import styles from 'resources/css/teams/options/List.module.css';

class TeamListOptions extends Component
{
  render()
  {
    const { url } = this.props.match;
    const { is_creating } = this.state;
    const createModal = is_creating ? this.renderModal() : null;

    return (
    <div className={styles.module}>
      <div className={styles.options}>
        <button className={cx(styles.btn, styles.create)} type="button" onClick={this.onCreateClick}>Create</button>
      </div>
      { createModal }
    </div>
    );
  }
}

export default TeamListOptions;