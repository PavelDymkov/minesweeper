import Dispatcher from "../libs/dispatcher.es6";
import Enum from "../libs/enum.es6";


export const appActions =
	Enum `
		START_GAME
		CONTINUE_GAME
		RESTART_GAME
		TO_MAIN_MENU
	`

export const startGame = (difficult) =>
	Dispatcher.dispatch({
		type: appActions.START_GAME,
		difficult
	});

export const continueGame = () =>
	Dispatcher.dispatch({
		type: appActions.CONTINUE_GAME
	});

export const restartGame = () =>
	Dispatcher.dispatch({
		type: appActions.RESTART_GAME
	});

export const toMainSrceen = () =>
	Dispatcher.dispatch({
		type: appActions.TO_MAIN_MENU
	});