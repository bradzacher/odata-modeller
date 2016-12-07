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
