import { connect } from 'react-redux';

import App from '../app.jsx';

function mapStateToProps(state) {
    return {
        hasExistingMetadata: state.metadata.doc !== null,
        metadataId: state.metadata.metadataId,
        snapToGrid: state.metadata.snapToGrid,
        gridSize: state.metadata.gridSize,
    };
}

export default connect(mapStateToProps)(App);
