import React from 'react';

import PropertyComponent from './propertyComponent.jsx';

const defaultWidth = 200;
const initialBuffer = 24;

export default class EntityComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            top: 0,
            left: props.index * (defaultWidth + initialBuffer),
            width: defaultWidth,
        };
    }

    render() {
        if (!this.props.entity) {
            return (<div />);
        }

        const properties = this.props.entity.properties.map((p, i) => (<PropertyComponent property={p} key={i} />));

        const containerStyles = {
            border: '1px solid black',
            position: 'absolute',
            overflow: 'hidden',
            top: `${this.state.top}px`,
            left: `${this.state.left}px`,
            width: `${this.state.width}px`,
        };

        return (
            <div style={containerStyles}>
                <div style={{ fontWeight: 'bold', border: '1px solid black' }}>{this.props.entity.name}</div>
                {properties}
            </div>
        );
    }
}

EntityComponent.defaultProps = {
    entity: null,
    index: 0,
};
EntityComponent.propTypes = {
    entity: React.PropTypes.object,
    index: React.PropTypes.number,
};
