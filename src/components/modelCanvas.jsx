import React from 'react';

import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

import Entity from './entity.jsx';
import Association from './association.jsx';

export default class ModelCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        window.screenshot = () => {
            domtoimage.toBlob(document.getElementById('canvas'), {
                bgcolor: '#FFFFFF',
            }).then((blob) => {
                FileSaver.saveAs(blob, 'image.png');
            });
        };
    }

    shouldComponentUpdate(nextProps) {
        return this.props.style !== nextProps.style ||
            this.props.metadata !== nextProps.metadata;
    }

    render() {
        console.renderLog('ModelCanvas');

        // no entity model? no render!
        if (!this.props.metadata) {
            return (<div />);
        }

        const entities = [];
        const entitiesByName = new Map();
        this.props.metadata.entities.forEach((e) => {
            // build the components
            entities.push(<Entity entity={e} key={e.name} />);
            entitiesByName.set(e.name, e);
        });

        const associations = [];
        this.props.metadata.associations.forEach((a) => {
            const end1 = entitiesByName.get(a.end1.name);
            const end2 = entitiesByName.get(a.end2.name);
            associations.push(<Association association={a} end1={end1} end2={end2} key={a.name} />);
        });

        return (
            <div style={this.props.style} id='canvas'>
                {entities}
                {associations}
            </div>
        );
    }
}

ModelCanvas.defaultProps = {
    style: {},
    metadata: null,
};
ModelCanvas.propTypes = {
    style: React.PropTypes.object,
    metadata: React.PropTypes.object,
};
