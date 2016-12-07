import React from 'react';
import extend from 'extend';

import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

import Entity from './entity.jsx';

export default class ModelCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        window.screenshot = () => {
            const canvas = document.getElementById('canvas');
            canvas.style.overflow = 'visible';
            window.setTimeout(() => {
                domtoimage.toBlob(document.getElementById('canvas'))
                    .then((blob) => {
                        canvas.style.overflow = 'scroll';
                        FileSaver.saveAs(blob, 'image.png');
                    });
            });
        };
    }

    shouldComponentUpdate(nextProps) {
        return this.props.style !== nextProps.style ||
            this.props.metadata !== nextProps.metadata;
    }

    render() {
        // no entity model? no render!
        if (!this.props.metadata) {
            return (<div />);
        }

        const entityDivs = [];
        this.props.metadata.entities.forEach((e) => {
            entityDivs.push(<Entity entity={e} key={e.name} />);
        });

        return (
            <div style={this.props.style} id='canvas'>
                {entityDivs}
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
