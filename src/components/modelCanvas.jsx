import React from 'react';
import extend from 'extend';

import Entity from './entity.jsx';

export default class ModelCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
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

        const style = extend({
            position: 'relative',
            overflow: 'scroll',
            height: '100%',
            width: '100%',
        }, this.props.style);

        return (
            <div style={style}>
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
