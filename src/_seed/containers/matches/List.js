/*
__Seed builder__v1.0
  (Read_only) Modify via SeedManifest.yaml
*/

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MatchActions from 'actions/matches';

import _MatchBase from '_seed/containers/matches/Base';
import MatchList from 'components/matches/List';

class _MatchList extends _MatchBase
{
  matches = new MatchActions();

  _states = state => ({
  });

  _disps = disp => ({
  })

  getRouter = () =>
    withRouter(connect(
      this.stateToProps,
      this.dispToProps
    )(MatchList));
}

export default _MatchList;

