import Dispatcher from "../libs/dispatcher.es6";
import Enum from "../libs/enum.es6";


export const gameplayActions =
	Enum `
		CHECK_CELL
		SET_FLAG
		CHECK_ALL_ARROUND_MINES_FLAGGED
		MARK_CELL
		UNMARK_CELL
		MARK_AREA
		UNMARK_AREA
	`

export const checkCell = (row, column) =>
	Dispatcher.dispatch({
		type: gameplayActions.CHECK_CELL,
		row, column
	});

export const setFlag = (row, column) =>
	Dispatcher.dispatch({
		type: gameplayActions.SET_FLAG,
		row, column
	});

export const checkAllArroundMinesFlagged = (row, column) =>
	Dispatcher.dispatch({
		type: gameplayActions.CHECK_ALL_ARROUND_MINES_FLAGGED,
		row, column
	});

export const markCell = (row, column) =>
	Dispatcher.dispatch({
		type: gameplayActions.MARK_CELL,
		row, column
	});

export const unmarkCell = (row, column) =>
	Dispatcher.dispatch({
		type: gameplayActions.UNMARK_CELL,
		row, column
	});

export const markArea = (row, column) =>
	Dispatcher.dispatch({
		type: gameplayActions.MARK_AREA,
		row, column
	});

export const unmarkArea = (row, column) =>
	Dispatcher.dispatch({
		type: gameplayActions.UNMARK_AREA,
		row, column
	});