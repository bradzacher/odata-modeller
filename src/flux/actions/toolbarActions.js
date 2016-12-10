export const SNAP_TO_GRID = 'SNAP_TO_GRID';
export function snapToGrid() {
    return {
        type: SNAP_TO_GRID,
    };
}

export const SET_GRID_SIZE = 'SET_GRID_SIZE';
export function setGridSize(size) {
    return {
        type: SET_GRID_SIZE,
        size,
    };
}
