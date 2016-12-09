import extend from 'extend';

import { READ_FILE, PARSE_FILE, PARSE_FILE_ERROR } from '../actions/readFile';
import { ENTITY_MOVE, ENTITY_RESIZE, SNAP_TO_GRID, SET_GRID_SIZE } from '../actions/entityInteraction';

const INITIAL_GRID_SIZE = 5;

let metadataId = 0;

export default function metadata(state = {
    isParsing: false,
    doc: null,
    metadataId: -1,
    parseError: null,
    snapToGrid: true,
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

            // copy the state - note we only copy objects along the path that is changing to make sure we only trigger the correct updates
            const newState = extend({}, state);
            newState.doc = extend({}, state.doc);
            const entities = newState.doc.entities = extend([], state.doc.entities);

            // update the entity with a new location
            const i = entities.findIndex(e => e.name === action.entity.name);
            const entity = extend({}, entities[i]);
            entity.absoluteLeft += action.movement.x;
            entity.absoluteTop += action.movement.y;

            if (state.snapToGrid) {
                // snap the position to grid
                entity.left = entity.absoluteLeft - (entity.absoluteLeft % state.gridSize);
                entity.top = entity.absoluteTop - (entity.absoluteTop % state.gridSize);
            } else {
                // use the pixel-perfect position
                entity.left = entity.absoluteLeft;
                entity.top = entity.absoluteTop;
            }
            newState.doc.entities[i] = entity;

            return newState;
        }

        case ENTITY_RESIZE:
            // an entity was resized...
            // TODO......
            return state;

        default:
            return state;
    }
}
