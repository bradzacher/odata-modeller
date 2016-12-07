import React from 'react';
import { Layout, Header, Navigation, Content, FABButton, Icon } from 'react-mdl';
// import the react-mdl library files
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';
// import ES6 shims..
import 'array.prototype.find';

import './index.scss';

import UploadComponent from './containers/uploadComponentContainer.jsx';
import ModelCanvas from './containers/modelCanvasContainer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.showUpload = this.showUpload.bind(this);
        this.closeUpload = this.closeUpload.bind(this);

        this.state = {
            showUpload: true,
            lastMetadataId: -1,
        };
    }

    showUpload() {
        this.setState({
            showUpload: true,
        });
    }
    closeUpload() {
        if (this.props.hasExistingMetadata) {
            this.setState({
                showUpload: false,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        // if we're open and the ID didn't change, then there was an error - so stay open
        const metadataDidChange = this.state.lastMetadataId !== nextProps.metadataId;
        this.setState({
            lastMetadataId: nextProps.metadataId,
            showUpload: this.state.showUpload && !metadataDidChange,
        });
    }

    render() {
        let modelCanvasDisplay = 'none';
        let uploaderDisplay = 'none';
        if (this.state.showUpload) {
            uploaderDisplay = 'block';
        } else {
            modelCanvasDisplay = 'block';
        }

        return (
            <div>
                <Layout fixedHeader>
                    <Header title='OData Model Viewer'>
                        <Navigation>
                            <a href='#' onClick={this.showUpload}>
                                Upload Metadata.xml
                            </a>
                        </Navigation>
                    </Header>
                    <Content>
                        <ModelCanvas style={{ display: modelCanvasDisplay }} />
                        <div style={{ display: uploaderDisplay }} className='upload-container'>
                            <FABButton onClick={this.closeUpload} className='upload-close-button'
                                       style={{ display: this.props.hasExistingMetadata ? 'block' : 'none' }} mini>
                                <Icon name='close' />
                            </FABButton>
                            <UploadComponent />
                        </div>
                    </Content>
                </Layout>
            </div>
        );
    }
}

App.defaultProps = {
    hasMetadata: false,
    metadataId: -1,
};
App.propTypes = {
    hasExistingMetadata: React.PropTypes.bool,
    metadataId: React.PropTypes.number,
};
