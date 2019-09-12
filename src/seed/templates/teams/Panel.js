/*
__Seed builder__v1.0
*/

import * as React from 'react';
import redux from 'seed/redux';
import cx from 'classnames';
import { Route } from 'react-router-dom';

import TeamDetails from 'seed/templates/teams/details/Details';
import TeamList from 'seed/templates/teams/List';
import TeamListOptions from 'seed/templates/teams/options/List';
import TeamDetailsOptions from 'seed/templates/teams/options/Details';
import TeamForm from 'seed/templates/teams/Form';

import Modal from 'seed/components/helpers/Modal';

import cls from 'resources/css/seed/templates/teams/Panel.module.css';

class TeamPanel extends React.Component
{
  render()
  {
    const { path, url } = this.props.match;
   
    const List = props =>
      <div className={cls.list}>
        <div className={cls.options}>
          <TeamListOptions {...props}/>
        </div>
        <div className={cls.content}>
          <TeamList {...props} />
        </div>
      </div>

    const Details = props =>
      <div className={cls.details}>
        <div className={cls.card}>
          <div className={cls.options}>
            <TeamDetailsOptions {...props} />
          </div>
          <div className={cls.content}>
            <TeamDetails {...props} />
          </div>
        </div>
      </div>

    const Form = props =>
      <Modal {...this.props}>
        <TeamForm />
      </Modal>

    return (
      <div className={cls.module}>
        <div className={cls.container}>
          <List />
          <Route
            path={`${path}/:team_id(\\d+)`}
            component={Details} />
        </div>
        <Route
          path={
            [`${path}/:any/new`,`${path}/new`,
            `${path}/:team_id(\\d+)/edit`] }
          component={Form} />
      </div>
    );
  }
}

export default TeamPanel;
