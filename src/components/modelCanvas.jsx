import React from 'react';

import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

import Entity from './entity.jsx';
import Association from './association.jsx';
import AssociationCanvas from './associationCanvas.jsx';

export default class ModelCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: '100%',
            width: '100%',
        };

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

        // build the entities
        const entities = [];
        this.props.metadata.entities.forEach((e) => {
            entities.push(<Entity entity={e} key={e.name} />);
        });

        // build the associations
        const associations = [];
        this.props.metadata.associations.forEach((a) => {
            const end1 = this.props.metadata.entities.get(a.end1.name);
            const end2 = this.props.metadata.entities.get(a.end2.name);
            associations.push(<Association association={a} end1={end1} end2={end2} key={a.name} />);
        });

        // figure out the canvas dimensions based on the child sizing
        let height = 0;
        let width = 0;
        this.props.metadata.entities.forEach((e) => {
            height = Math.max(height, e.position.top + e.size.height);
            width = Math.max(width, e.position.left + e.size.width);
        });

        return (
            <div style={this.props.style} id='canvas'>
                {entities}
                <AssociationCanvas height={height} width={width}>
                    {associations}
                </AssociationCanvas>
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
