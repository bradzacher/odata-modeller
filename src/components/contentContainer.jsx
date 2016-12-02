import React from 'react';

import UploadComponent from './uploadComponent.jsx';

export default class ContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (<UploadComponent />);
    }
}
