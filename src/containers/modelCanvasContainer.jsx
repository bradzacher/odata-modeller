import { connect } from 'react-redux';

import ModelCanvas from '../components/modelCanvas.jsx';

function mapStateToProps(state) {
    return {
        metadataId: state.metadata.metadataId,
        metadata: state.metadata.doc,
    };
}

export default connect(mapStateToProps)(ModelCanvas);
