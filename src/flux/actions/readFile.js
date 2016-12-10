const INITIAL_ENTITY_WIDTH = 250;
const ENTITY_SPACING_BUFFER = 24;
const ENTITY_POSITION_GUTTER = 8;

export const PARSE_FILE_ERROR = 'PARSE_FILE_ERROR';
function parseFileError(detailedError) {
    return {
        type: PARSE_FILE_ERROR,
        error: 'Error parsing metadata.xml, see the console for detailed error message.',
        detailedError,
    };
}

function arrayLike(fnName, arr, ...args) {
    return Array.prototype[fnName].call(arr, ...args);
}
function getAttributeValue(element, attrName) {
    const attr = element.attributes.getNamedItem(attrName);
    return attr ? attr.value : null;
}

function decodeMetadata(doc) {
    const schema = doc.getElementsByTagName('Schema')[0];
    if (!schema) {
        throw parseFileError('Schema element was not found in the document.');
    }

    const namespace = `${getAttributeValue(schema, 'Namespace')}.`;

    // grab the entities
    const entities = arrayLike('map', schema.getElementsByTagName('EntityType'),
        (entity, i) => {
            // get the key names
            const keyElement = entity.getElementsByTagName('Key')[0];
            const keyRefs = arrayLike('map', keyElement.getElementsByTagName('PropertyRef'),
                k => getAttributeValue(k, 'Name'));

            // get the properties
            const properties = arrayLike('map', entity.getElementsByTagName('Property'),
                (p) => {
                    const name = getAttributeValue(p, 'Name');
                    return {
                        name,
                        type: getAttributeValue(p, 'Type'),
                        nullable: getAttributeValue(p, 'Nullable'),
                        // check if the property belogs to the entity's key
                        isKey: !!keyRefs.find(k => k === name),
                    };
                });

            // sort the props - putting keys first, then sorting alphabetically
            properties.sort((a, b) => {
                if (a.isKey && !b.isKey) {
                    return -1;
                } else if (!a.isKey && b.isKey) {
                    return 1;
                }
                return a.name.localeCompare(b.name);
            });

            // get the navigation properties
            const navProperties = arrayLike('map', entity.getElementsByTagName('NavigationProperty'),
                p => ({
                    name: getAttributeValue(p, 'Name'),
                    type: 'Navigation',
                    // grab the association key and de-namespace it
                    association: getAttributeValue(p, 'Relationship').replace(namespace, ''),
                }));

            // return the structured data
            const top = ENTITY_POSITION_GUTTER;
            const left = ENTITY_POSITION_GUTTER + (i * (INITIAL_ENTITY_WIDTH + ENTITY_SPACING_BUFFER));
            return {
                name: getAttributeValue(entity, 'Name'),
                properties,
                navProperties,
                unsnappedWidth: INITIAL_ENTITY_WIDTH,
                unsnappedHeight: 0,
                width: INITIAL_ENTITY_WIDTH,
                height: null,
                unsnappedTop: top,
                unsnappedLeft: left,
                top,
                left,
            };
        });

    // get the associations
    const associations = arrayLike('map', schema.getElementsByTagName('Association'),
        (ass) => {
            // there should be two ends listed - the entities which are joined by the association
            const ends = arrayLike('map', ass.getElementsByTagName('End'),
                end => ({
                    // grab the entity name and de-namespace it
                    name: getAttributeValue(end, 'Type').replace(namespace, ''),
                    multiplicity: getAttributeValue(end, 'Multiplicity'),
                }));

            return {
                name: getAttributeValue(ass, 'Name'),
                end1: ends[0],
                end2: ends[1],
            };
        });

    return {
        entities,
        associations,
    };
}

// dispatched when the user selects a new metadata file
export const READ_FILE = 'READ_FILE';
export const PARSE_FILE = 'PARSE_FILE';
export const readFile = file => (dispatch) => {
    if (!file) {
        return dispatch({
            type: PARSE_FILE_ERROR,
            error: 'Not a valid file',
        });
    }

    // let the store know we're loading
    dispatch({
        type: READ_FILE,
    });

    return new Promise((resolve) => {
        // read the file
        const reader = new FileReader();
        reader.onload = () => {
            // parse the XML
            let detailedError;
            const parser = new DOMParser();
            let doc;
            try {
                doc = parser.parseFromString(reader.result, 'text/xml');
            } catch (e) {
                detailedError = e;
            }

            // check for error
            const parseError = doc.getElementsByTagName('parsererror')[0];
            if (parseError) {
                detailedError = parseError.innerHTML.trim();
                resolve(dispatch(parseFileError(detailedError)));
            } else {
                // convert the document into a more managable form
                try {
                    const decodedDoc = decodeMetadata(doc);

                    // resolve by dispatching a PARSE_FILE action
                    resolve(dispatch({
                        type: PARSE_FILE,
                        doc: decodedDoc,
                    }));
                } catch (e) {
                    if (e instanceof Error) {
                        resolve(dispatch(parseFileError(e)));
                    } else {
                        resolve(dispatch(e));
                    }
                }
            }
        };
        reader.readAsText(file);
    });
};
