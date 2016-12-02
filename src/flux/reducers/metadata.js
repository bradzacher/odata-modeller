import extend from 'extend';

import { READ_FILE, PARSE_FILE, PARSE_FILE_ERROR } from '../actions/readFile';

let metadataId = 0;

export default function metadata(state = {
    isParsing: false,
    doc: null,
}, action) {
    switch (action.type) {
        case READ_FILE:
            // file will be read
            return extend({}, state, {
                isParsing: true,
                parseError: null,
            });

        case PARSE_FILE:
            // file was parsed
            metadataId += 1;
            return extend({}, state, {
                isParsing: false,
                doc: action.doc,
                metadataId,
                parseError: null,
            });

        case PARSE_FILE_ERROR:
            return extend({}, state, {
                isParsing: false,
                parseError: action.error,
            });

        default:
            return state;
    }
}
