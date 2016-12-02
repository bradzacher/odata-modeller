import React from 'react';
import { Layout, Header, Navigation, Content, Snackbar } from 'react-mdl';
// import the react-mdl library files
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';

import './index.scss';

import UploadDialog from './components/uploadDialog.jsx';
import ContentContainer from './components/contentContainer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onSnackbarTimeout = this.onSnackbarTimeout.bind(this);

        this.state = {
            showSnackbar: false,
            snackbarText: '',
        };
    }

    onSnackbarTimeout() {
        this.setState({
            showSnackbar: false,
        });
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Layout fixedHeader>
                    <Header title='OData Model Viewer'>
                        <Navigation>
                            <UploadDialog />
                        </Navigation>
                    </Header>
                    <Content style={{ height: '100%' }}>
                        <ContentContainer />
                        <Snackbar active={this.state.showSnackbar} onTimeout={this.onSnackbarTimeout}
                                  onClick={this.onSnackbarTimeout} action='Close'>
                                  {this.state.snackbarText}
                        </Snackbar>
                    </Content>
                </Layout>
            </div>
        );
    }
}
