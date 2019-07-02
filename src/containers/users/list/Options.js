/*
__Seed builder__v1.0

  Guidelines:
    - Modify default methods & attributes via SeedManifest.yaml
    - Include extra states & props according to current models or ACTIONS
      - Example getTopPlayers()
      
  Default attributes:
    - users
    - teams

  Default methods:
    - getUserDetails(userId, callback)
    - getUserList(filters, callback)
    - getTeamList(filters, callback)
    - saveUser(user, callback)
    - setUser(userId, user, callback)
    - deleteUser: (userId, callback)
*/

import _UserListOptions from '_seed/containers/users/list/Options';

class UserListOptions extends _UserListOptions
{
  states = state => ({
  });

  disps = disp => ({
  });
}

export default new UserListOptions().getRouter()