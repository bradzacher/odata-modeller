import extend from 'extend';

import { READ_FILE, PARSE_FILE, PARSE_FILE_ERROR } from '../actions/readFile';
import { ENTITY_MOVE, ENTITY_SET_SIZE, ENTITY_RESIZE } from '../actions/entityInteraction';
import { SNAP_TO_GRID, SET_GRID_SIZE } from '../actions/toolbarActions';

const INITIAL_GRID_SIZE = 5;

let metadataId = 0;

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

            // copy the state - note we only copy objects along the path that is changing to make sure we only trigger the correct updates
            const newState = extend({}, state);
            newState.doc = extend({}, state.doc);
            const entities = newState.doc.entities = extend([], state.doc.entities);

            // update the entity with a new location
            const i = entities.findIndex(e => e.name === action.entity.name);
            const entity = extend({}, entities[i]);
            entity.unsnappedLeft += action.movement.x;
            entity.unsnappedTop += action.movement.y;

            if (state.snapToGrid) {
                // snap the position to grid
                entity.left = entity.unsnappedLeft - (entity.unsnappedLeft % state.gridSize);
                entity.top = entity.unsnappedTop - (entity.unsnappedTop % state.gridSize);
            } else {
                // use the pixel-perfect position
                entity.left = entity.unsnappedLeft;
                entity.top = entity.unsnappedTop;
            }
            newState.doc.entities[i] = entity;

            return newState;
        }

        case ENTITY_SET_SIZE:
            // reuse use the ENTIY_RESIZE action
            action.dimensionChange = {
                height: action.dimensions.height - action.entity.unsnappedHeight,
                width: action.dimensions.width - action.entity.unsnappedWidth,
            };
        // eslint-disable-nextline no-fallthrough
        case ENTITY_RESIZE: {
            // an entity was resized...
            if (action.dimensionChange.height === 0 &&
                action.dimensionChange.width === 0) {
                // no change
                return state;
            }

            // copy the state - note we only copy objects along the path that is changing to make sure we only trigger the correct updates
            const newState = extend({}, state);
            newState.doc = extend({}, state.doc);
            const entities = newState.doc.entities = extend([], state.doc.entities);

            // update the entity with a new size
            const i = entities.findIndex(e => e.name === action.entity.name);
            const entity = extend({}, entities[i]);
            entity.unsnappedWidth += action.dimensionChange.width;
            entity.unsnappedHeight += action.dimensionChange.height;

            if (state.snapToGrid) {
                // snap the dimension to grid
                entity.width = entity.unsnappedWidth - (entity.unsnappedWidth % state.gridSize);
                entity.height = entity.unsnappedHeight - (entity.unsnappedHeight % state.gridSize);
            } else {
                // use the pixel-perfect dimension
                entity.width = entity.unsnappedWidth;
                entity.height = entity.unsnappedHeight;
            }
            newState.doc.entities[i] = entity;

            return newState;
        }

        default:
            return state;
    }
}
