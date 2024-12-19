import { get } from 'http';
import { PlayerInput } from '../types';
import playerDB from '../repository/player.db';
import userDB from '../repository/user.db';
import teamDB from '../repository/team.db';
import Player from '../model/player';

const getAllPlayers = async () => {
    const players = await playerDB.getAllPlayers();
    return players;
};

export default {
    getAllPlayers,
};
