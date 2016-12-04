// dispatched when the user selects a new metadata file
export const READ_FILE = 'READ_FILE';
export const PARSE_FILE = 'PARSE_FILE';
export const PARSE_FILE_ERROR = 'PARSE_FILE_ERROR';
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
            let doc;
            try {
                doc = parser.parseFromString(reader.result, 'text/xml');
            } catch (e) {
                console.error('exception', e);
            }

            // check for error
            const parseError = doc.getElementsByTagName('parsererror')[0];
            if (parseError) {
                const error = parseError.innerHTML.trim();
                console.error(error);

                resolve(dispatch({
                    type: PARSE_FILE_ERROR,
                    error: 'Error parsing metadata.xml, see the console for detailed error message.',
                }));
            } else {
                // resolve by dispatching a PARSE_FILE action
                resolve(dispatch({
                    type: PARSE_FILE,
                    doc,
                }));
            }
        };
        reader.readAsText(file);
    });
};
