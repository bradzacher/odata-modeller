import extend from 'extend';

import { READ_FILE, PARSE_FILE } from '../actions/readFile';

export default function metadata(state = {
    isParsing: false,
    metadataDoc: null,
}, action) {
    switch (action.type) {
        case READ_FILE:
            // file will be read
            return extend({}, state, {
                isParsing: true,
            });

        case PARSE_FILE:
            // file was parsed
            return extend({}, state, {
                isParsing: false,
                metadataDoc: action.doc,
            });

        default:
            return state;
    }
}
