// dispatched when the user selects a new metadata file
export const READ_FILE = 'READ_FILE';
export const PARSE_FILE = 'PARSE_FILE';
export const readFile = file => (dispatch) => {
    if (!file) {
        return Promise.reject('Invalid File');
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
            const parser = new DOMParser();
            const doc = parser.parseFromString(reader.result, 'application/xml');

            // resolve by dispatching a PARSE_FILE action
            resolve(dispatch({
                type: PARSE_FILE,
                doc,
            }));
        };
        reader.readAsText(file);
    });
};
