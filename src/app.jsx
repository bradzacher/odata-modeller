import React from 'react';
import { Layout, Header, HeaderRow, Navigation, Content, FABButton, Icon,
        Slider, IconToggle, Tooltip } from 'react-mdl';
// import the react-mdl library files
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';
// import ES6 shims..
import 'array.prototype.find';

import './styles/index.scss';
import './styles/mdl-cust.scss';

import UploadComponent from './containers/uploadComponentContainer.jsx';
import ModelCanvas from './containers/modelCanvasContainer.jsx';

import { snapToGrid, setGridSize } from './flux/actions/toolbarActions';
import store from './flux/store';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.showUpload = this.showUpload.bind(this);
        this.closeUpload = this.closeUpload.bind(this);
        this.toggleSnapToGrid = this.toggleSnapToGrid.bind(this);

        this.state = {
            showUpload: true,
            lastMetadataId: -1,
            snapToGrid: false,
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

    toggleSnapToGrid() {
        store.dispatch(snapToGrid());
    }

    setGridSize(evt) {
        store.dispatch(setGridSize(parseInt(evt.target.value, 10)));
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
                    <Header>
                        <HeaderRow title='OData Model Viewer'>
                            <Navigation>
                                <a href='#' onClick={this.showUpload}>
                                    Upload Metadata.xml
                                </a>
                            </Navigation>
                        </HeaderRow>
                        <HeaderRow className='toolbar'>
                            <Tooltip label='Toggle Snap Grid'>
                                <IconToggle ripple checked={this.props.snapToGrid} onChange={this.toggleSnapToGrid} name={
                                    this.props.snapToGrid ? 'grid_on' : 'grid_off'
                                } />
                            </Tooltip>
                            <Tooltip label='Grid Size'>
                                <Slider min={4} max={20} defaultValue={this.props.gridSize} onChange={this.setGridSize} />
                            </Tooltip>
                        </HeaderRow>
                    </Header>
                    <Content>
                        <ModelCanvas style={{ display: modelCanvasDisplay }} />
                        <div style={{ display: uploaderDisplay }} className='upload-container'>
                            <FABButton onClick={this.closeUpload} className='upload-close-button'
                                       style={{ display: this.props.hasExistingMetadata ? 'block' : 'none' }} mini colored>
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
    snapToGrid: true,
    gridSize: 5,
};
App.propTypes = {
    hasExistingMetadata: React.PropTypes.bool,
    metadataId: React.PropTypes.number,
    snapToGrid: React.PropTypes.bool,
    gridSize: React.PropTypes.number,
};
