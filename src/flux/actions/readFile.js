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
            const doc = parser.parseFromString(reader.result, 'text/xml');

            // check for error
            const parseError = doc.getElementsByTagName('parsererror')[0];
            if (parseError) {
                let error = parseError.getElementsByTagName('div')[0];
                if (!error) {
                    error = parseError.innerHTML;
                } else {
                    error = error.innerHTML;
                }
                error = error.trim();

                console.error(error);

                resolve(dispatch({
                    type: PARSE_FILE_ERROR,
                    error,
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
