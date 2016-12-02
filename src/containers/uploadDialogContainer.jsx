import { connect } from 'react-redux';

import UploadDialog from '../components/uploadDialog.jsx';

// we don't actually care for state
function mapStateToProps(state) {
    return {
        metadataId: state.metadata.metadataId,
    };
}

export default connect(mapStateToProps)(UploadDialog);
