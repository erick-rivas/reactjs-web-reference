/*
__Seed builder__v1.0
*/

import * as React from 'react';

import * as DataUtil from 'sbuild/util/DataUtil';

import styles from 'resources/css/teams/Form.module.css';

class _TeamForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      team: {
        rival_id: this.getRivalId(),
      },
      filters: {
        user_id: this.getUserId(),
        rival_id: this.getRivalId(), 
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onLogoChange = this.onLogoChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onMarketValueChange = this.onMarketValueChange.bind(this);
    this.onRivalChange = this.onRivalChange.bind(this);
  }

  componentDidMount()
  {
    this.loadData();
    this.loadFkData();
  }

  /* Props */

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

  loadData = () =>
  {
    const { getTeamDetails } = this.props;
    const teamId = this.getTeamId();
    if (teamId != null) {
      const callback = res => 
      {
        const teamId = this.getTeamId();
        const team = DataUtil.getItem(this.props.teams, teamId);
        if (team.id != null)
          this.setState({
            team: Object.assign({}, this.state.team, team)
          })
      }
      getTeamDetails(teamId, callback);
    }
  }

  loadFkData = () => 
  {
    const { getTeamList } = this.props;
    getTeamList(this.state.filters);
  }

  fillData = e =>
  {
    let team = this.state.team ? this.state.team : {};
    team.name = team.name ? team.name : e.target.name.value;
    team.logo = team.logo ? team.logo : e.target.logo.value;
    team.description = team.description ? team.description : e.target.description.value;
    team.market_value = team.market_value ? team.market_value : e.target.marketValue.value;
    team.rival_id = team.rival_id ? team.rival_id : e.target.rival.value;

    this.setState({
      team: team
    });
  }

  saveData = e =>
  {
    const { saveTeam, setTeam } = this.props;
    const teamId = this.getTeamId();
    const onSave = res => 
    {
      if (res.ok) this.onSave(res.body);
      else this.onError(res.body)
    };
    if (teamId == null && saveTeam != null)
      saveTeam(this.state.team, onSave)
    if (teamId != null && setTeam != null)
      setTeam(teamId, this.state.team, onSave);
  }

  /* Args */

  getTeamId() 
  {
    const { team_id } = this.props.match.params;
    const { teamId } = this.props;
    return team_id ? team_id : teamId;
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
  getRivalId()
  {
    const { rival_id } = this.props.match.params;
    const { rivalId } = this.props;
    return rival_id ? rival_id : rivalId;
  }

  /* Events */

  onSubmit(e)
  {
    e.preventDefault();
    this.fillData(e);
    this.saveData(e);
  }
  
  onNameChange(e)
  {
    let team = this.state.team ? this.state.team : {};
    team.name = e.target.value;  
    this.setState({
      team: team
    });
  }
  
  onLogoChange(e)
  {
    const { uploadFile } = this.props;
    const callback = res => {
      let team = this.state.team ? this.state.team : {};
      team.logo = res.body;
      team.logo_id = res.body.id;
      this.setState({
        team: team
      });
    }
    uploadFile(e.target.form, callback);
  }
  
  onDescriptionChange(e)
  {
    let team = this.state.team ? this.state.team : {};
    team.description = e.target.value;  
    this.setState({
      team: team
    });
  }
  
  onMarketValueChange(e)
  {
    let team = this.state.team ? this.state.team : {};
    team.market_value = e.target.value;  
    this.setState({
      team: team
    });
  }
  
  onRivalChange(e)
  {
    let team = this.state.team ? this.state.team : {};
    team.rival_id = e.target.value;
    this.setState({
      team: team
    });
  }

  /* Components */

  renderError()
  {
    const { error } = this.state;
    return ( 
    error ? <div className={styles.error}>{error}</div> : null
    );
  }
}

export default _TeamForm;