import extend from 'extend';

import calculateMidpoint from '../calculateMidpoint';

import { READ_FILE, PARSE_FILE, PARSE_FILE_ERROR } from '../actions/readFile';
import { ENTITY_MOVE, ENTITY_RESIZE } from '../actions/entityInteraction';
import { SNAP_TO_GRID, SET_GRID_SIZE } from '../actions/toolbarActions';

const INITIAL_GRID_SIZE = 5;

let metadataId = 0;

function copyEntityState(state, action) {
    // note we only copy objects along the path that is changing to make sure we only trigger the correct updates
    const newState = extend({}, state);
    newState.doc = extend({}, state.doc);
    const entities = newState.doc.entities = new Map(state.doc.entities);
    // get the specific entity
    const entity = extend({}, entities.get(action.entity.name));

    return {
        newState,
        entity,
    };
}

export default function metadata(state = {
    isParsing: false,
    doc: null,
    metadataId: -1,
    parseError: null,
    snapToGrid: false,
    gridSize: INITIAL_GRID_SIZE,
}, action) {
    switch (action.type) {
        case READ_FILE:
            // file will be read...
            return extend({}, state, {
                isParsing: true,
                parseError: null,
            });

        case PARSE_FILE:
            // file was parsed...
            metadataId += 1;
            return extend({}, state, {
                isParsing: false,
                doc: action.doc,
                metadataId,
                parseError: null,
            });

        case PARSE_FILE_ERROR:
            // file was parsed unsuccessfully...
            console.error(action.error, action.detailedError);
            return extend({}, state, {
                isParsing: false,
                parseError: action.error,
            });

        case SNAP_TO_GRID:
            // snap to grid mode was toggled
            return extend({}, state, {
                snapToGrid: !state.snapToGrid,
            });

        case SET_GRID_SIZE:
            // set the grid size
            return extend({}, state, {
                gridSize: action.size,
            });

        case ENTITY_MOVE: {
            // an entity was moved...
            if (action.movement.x === 0 &&
                action.movement.y === 0) {
                // no change
                return state;
            }

            // copy the state
            const { newState, entity } = copyEntityState(state, action);
            entity.position = extend({}, entity.position);

            // update the entity with a new location
            entity.position.unsnappedLeft += action.movement.x;
            entity.position.unsnappedTop += action.movement.y;

            if (state.snapToGrid) {
                // snap the position to grid
                entity.position.left = entity.position.unsnappedLeft - (entity.position.unsnappedLeft % state.gridSize);
                entity.position.top = entity.position.unsnappedTop - (entity.position.unsnappedTop % state.gridSize);
            } else {
                // use the pixel-perfect position
                entity.position.left = entity.position.unsnappedLeft;
                entity.position.top = entity.position.unsnappedTop;
            }
            // recalculate the midpoint
            entity.midpoint = calculateMidpoint(entity);

            newState.doc.entities.set(entity.name, entity);
            return newState;
        }

        case ENTITY_RESIZE: {
            // an entity was resized...
            if (action.dimensionChange.height === 0 &&
                action.dimensionChange.width === 0) {
                // no change
                return state;
            }

            // copy the state
            const { newState, entity } = copyEntityState(state, action);
            entity.size = extend({}, entity.size);

            // update the entity with a new size
            entity.size.unsnappedWidth += action.dimensionChange.width;
            entity.size.unsnappedHeight += action.dimensionChange.height;

            if (state.snapToGrid) {
                // snap the dimension to grid
                entity.size.width = entity.size.unsnappedWidth - (entity.size.unsnappedWidth % state.gridSize);
                entity.size.height = entity.size.unsnappedHeight - (entity.size.unsnappedHeight % state.gridSize);
            } else {
                // use the pixel-perfect dimension
                entity.size.width = entity.size.unsnappedWidth;
                entity.size.height = entity.size.unsnappedHeight;
            }
            // recalculate the midpoint
            entity.midpoint = calculateMidpoint(entity);

            newState.doc.entities.set(entity.name, entity);
            return newState;
        }

        default:
            return state;
    }
}
