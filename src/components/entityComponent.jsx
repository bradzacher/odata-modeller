import React from 'react';
import extend from 'extend';

import PropertyComponent from './propertyComponent.jsx';

const defaultWidth = 200;
const initialBuffer = 24;
const minWidth = 100;

export default class EntityComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            top: 0,
            left: props.index * (defaultWidth + initialBuffer),
            width: defaultWidth,
            height: null,
            minHeight: null,
            minWidth,
        };

        // reference to the container div in the DOM
        this.container = null;
    }

    componentDidMount() {
        // save the browser calculated height
        this.setState({
            minHeight: this.container.clientHeight,
        });
    }

    render() {
        if (!this.props.entity) {
            return (<div />);
        }

        const properties = this.props.entity.properties.map((p, i) => (<PropertyComponent property={p} key={i} />));

        const containerStyles = extend({
            border: '1px solid black',
            position: 'absolute',
            overflow: 'hidden',
            top: `${this.state.top}px`,
            left: `${this.state.left}px`,
            width: `${this.state.width}px`,
            height: this.state.height ? `${this.state.height}px` : 'auto',
            minHeight: `${this.state.minHeight}px`,
            // todo change this to a js based solution as it's not supported on IE/Edge
            resize: 'both',
        }, this.props.style);

        return (
            <div style={containerStyles} ref={div => this.container = div}>
                <div style={{ fontWeight: 'bold', border: '1px solid black', cursor: 'move' }}>{this.props.entity.name}</div>
                {properties}
            </div>
        );
    }
}

EntityComponent.defaultProps = {
    entity: null,
    index: 0,
    style: {},
};
EntityComponent.propTypes = {
    entity: React.PropTypes.object,
    index: React.PropTypes.number,
    style: React.PropTypes.object,
};
