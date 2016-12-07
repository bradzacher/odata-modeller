import extend from 'extend';

import { READ_FILE, PARSE_FILE, PARSE_FILE_ERROR } from '../actions/readFile';
import { ENTITY_MOVE, ENTITY_RESIZE } from '../actions/entityInteraction';

let metadataId = 0;

export default function metadata(state = {
    isParsing: false,
    doc: null,
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

        case ENTITY_MOVE: {
            // an entity was moved...

            // copy the state
            const newState = extend({}, state);
            newState.doc = extend({}, state.doc);
            const entities = newState.doc.entities = extend([], state.doc.entities);

            // update the entity with a new location
            const i = entities.findIndex(e => e.name === action.entity.name);
            const entity = extend({}, entities[i]);
            entity.left += action.movement.x;
            entity.top += action.movement.y;
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
