/*
__Seed builder__v1.0

  Guidelines:
    - Modify methods via SeedManifest.yaml
    - Only override existing methods if required

  Methods:
    - getPlayerList(filters, callback)
    - getPlayerDetails(playerId, callback)
    - savePlayer(player, callback)
    - setPlayer(playerId, player, callback)
    - deletePlayer(playerId, callback)
*/

import _Players from '_seed/interactors/actions/players';

class Players extends _Players {}

export default Players;