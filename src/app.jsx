import React from 'react';
import { Layout, Header, Navigation, Content } from 'react-mdl';
// import the react-mdl library files
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material';

// import styles from './index.scss';

import UploadDialog from './components/uploadDialog.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <Layout fixedHeader>
                    <Header title='OData Model Viewer'>
                        <Navigation>
                            <UploadDialog />
                            <a>Link</a>
                            <a>Link</a>
                            <a>Link</a>
                        </Navigation>
                    </Header>
                    <Content />
                </Layout>
            </div>
        );
    }
}
