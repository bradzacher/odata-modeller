import React from 'react';
import { Layout, Header, Navigation, Content } from 'react-mdl';
// import the react-mdl library files
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';

import './index.scss';

import UploadDialogContainer from './containers/uploadDialogContainer.jsx';
import ContentContainer from './components/contentContainer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSnackbar: false,
            snackbarText: '',
        };
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Layout fixedHeader>
                    <Header title='OData Model Viewer'>
                        <Navigation>
                            <UploadDialogContainer />
                        </Navigation>
                    </Header>
                    <Content style={{ height: '100%' }}>
                        <ContentContainer />
                    </Content>
                </Layout>
            </div>
        );
    }
}
