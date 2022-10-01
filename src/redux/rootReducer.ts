import { combineReducers } from 'redux';
import { State } from '../types';
import { AuthActions } from './auth/authActions';
import authReducer from './auth/authReducer';
import { SpotifyActions } from './spotify/spotifyActions';
import spotifyReducer from './spotify/spotifyReducer';

export type AnyAction = AuthActions | SpotifyActions;

export default combineReducers<State>({ auth: authReducer, search: spotifyReducer });
