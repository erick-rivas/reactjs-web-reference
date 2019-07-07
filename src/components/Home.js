/*
__Seed builder__v1.0
*/

import * as React from 'react';
import cx from 'classnames';

import { Switch, Route, Redirect } from 'react-router-dom'

import Sidenav from 'containers/nav/Sidenav'
import Topnav from 'containers/nav/Topnav'
import PlayerPanel from 'components/players/nav/Panel';
import TeamPanel from 'components/teams/nav/Panel';
import UserPanel from 'components/users/nav/Panel';
import MatchPanel from 'components/stats/matches/nav/Panel';
import ScorePanel from 'components/stats/scores/nav/Panel';

import Component from 'components/Home.link'

import styles from 'resources/css/Home.module.css';

class Home extends Component
{
  render()
  {
    const { path } = this.props.match;

    return (
      <div className={styles.module}>
        <div className={styles.drawer}>
          <div className={styles.sidenav}>
            <Route path={`${path}`}
              component={Sidenav} />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.topnav}>
            <Route path={`${path}`}
              component={Topnav} />
          </div>
          <div className={styles.content}>        
             <Switch>
              <Route
                path={`${path}/players`}
                component={PlayerPanel} />
              <Route
                path={`${path}/teams`}
                component={TeamPanel} />
              <Route
                path={`${path}/users`}
                component={UserPanel} />
              <Route
                path={`${path}/matches`}
                component={MatchPanel} />
              <Route
                path={`${path}/scores`}
                component={ScorePanel} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
