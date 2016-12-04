import React from 'react';
import { Layout, Header, Navigation, Content, FABButton, Icon } from 'react-mdl';
// import the react-mdl library files
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';

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
        const uploadCloseButtonStyle = {
            display: this.props.hasExistingMetadata ? 'block' : 'none',
            position: 'absolute',
            right: '12px',
            top: '12px',
        };
        const contentStyle = {
            display: 'none',
            height: '100%',
            width: '100%',
        };
        const uploadStyle = {
            display: 'none',
            height: '100%',
            width: '100%',
        };
        if (this.state.showUpload) {
            uploadStyle.display = 'block';
        } else {
            contentStyle.display = 'block';
        }

        return (
            <div style={{ height: '100%' }}>
                <Layout fixedHeader>
                    <Header title='OData Model Viewer'>
                        <Navigation>
                            <a href='#' onClick={this.showUpload}>
                                Upload Metadata.xml
                            </a>
                        </Navigation>
                    </Header>
                    <Content style={{ height: '100%' }}>
                        <ModelCanvas style={contentStyle} />
                        <div style={uploadStyle}>
                            <FABButton onClick={this.closeUpload} style={uploadCloseButtonStyle} mini colored>
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
