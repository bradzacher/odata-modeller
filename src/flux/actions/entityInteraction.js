export const ENTITY_MOVE = 'ENTITY_MOVE';
export function entityMove(movement, entity) {
    return {
        type: ENTITY_MOVE,
        movement,
        entity,
    };
}

export const ENTITY_SET_SIZE = 'ENTITY_SET_SIZE';
export function entitySetSize(width, height, entity) {
    return {
        type: ENTITY_SET_SIZE,
        dimensions: {
            width,
            height,
        },
        entity,
    };
}

export const ENTITY_RESIZE = 'ENTITY_RESIZE';
export function entityResize(width, height, entity) {
    return {
        type: ENTITY_RESIZE,
        dimensionChange: {
            width,
            height,
        },
        entity,
    };
}
