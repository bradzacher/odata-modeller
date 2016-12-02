import { connect } from 'react-redux';

import UploadComponent from '../components/uploadComponent.jsx';

function mapStateToProps(state) {
    return {
        hasExistingMetadata: state.metadata.doc !== null,
        parseError: state.metadata.parseError,
    };
}

export default connect(mapStateToProps)(UploadComponent);
