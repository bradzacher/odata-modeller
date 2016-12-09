export const ENTITY_MOVE = 'ENTITY_MOVE';
export function entityMove(movement, entity) {
    return {
        type: ENTITY_MOVE,
        movement,
        entity,
    };
}

export const ENTITY_RESIZE = 'ENTITY_RESIZE';
export function entityResize(dimensions, entity) {
    return {
        type: ENTITY_RESIZE,
        dimensions,
        entity,
    };
}

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
