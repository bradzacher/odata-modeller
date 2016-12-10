import React from 'react';
import { Card, CardTitle, CardText } from 'react-mdl';

import PropertyList from './propertyList.jsx';

import store from '../flux/store';
import { entityMove, entitySetSize, entityResize } from '../flux/actions/entityInteraction';

export default class Entity extends React.Component {
    constructor(props) {
        super(props);

        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);

        // reference to the container div in the DOM
        this.container = null;

        // the coords of the last event's click
        this.lastEvent = null;
    }

    componentDidMount() {
        // save the browser calculated height as the entity's height
        // note we have to wait a tick so the browser can actually do its render
        window.setTimeout(() => {
            store.dispatch(entitySetSize(this.container.clientWidth,
                this.container.clientHeight,
                this.props.entity));
        });
    }

    shouldComponentUpdate(newProps) {
        // only update if our entity prop is a new object
        return newProps.entity !== this.props.entity;
    }

    onPointerDown(evt) {
        this.lastEvent = {
            x: evt.screenX,
            y: evt.screenY,
        };
        window.addEventListener('mousemove', this.onPointerMove);
        window.addEventListener('touchmove', this.onPointerMove);
        window.addEventListener('mouseup', this.onPointerUp);
        window.addEventListener('touchend', this.onPointerUp);
        evt.preventDefault();
    }

    onPointerUp(evt) {
        this.lastEvent = null;
        window.removeEventListener('mousemove', this.onPointerMove);
        window.removeEventListener('touchmove', this.onPointerMove);
        window.removeEventListener('mouseup', this.onPointerUp);
        window.removeEventListener('touchend', this.onPointerUp);
        evt.preventDefault();
    }

    onPointerMove(evt) {
        const movement = {
            x: evt.screenX - this.lastEvent.x,
            y: evt.screenY - this.lastEvent.y,
        };
        this.lastEvent = {
            x: evt.screenX,
            y: evt.screenY,
        };
        store.dispatch(entityMove(movement, this.props.entity));
        evt.preventDefault();
    }

    render() {
        console.renderLog('Entity');

        if (!this.props.entity) {
            return (<div />);
        }

        const containerStyles = {
            top: `${this.props.entity.top}px`,
            left: `${this.props.entity.left}px`,
        };

        const cardStyles = {
            width: `${this.props.entity.width}px`,
            height: this.props.entity.height ? `${this.props.entity.height}px` : 'auto',
        };

        return (
            <div style={containerStyles} className='entity' ref={(div) => { this.container = div; }}>
                <Card shadow={1} style={cardStyles}>
                    <CardTitle onMouseDown={this.onPointerDown} onTouchStart={this.onPointerDown}>
                        {this.props.entity.name}
                    </CardTitle>
                    <CardText>
                        <PropertyList properties={this.props.entity.properties} navProperties={this.props.entity.navProperties} />
                    </CardText>
                </Card>
            </div>
        );
    }
}

Entity.defaultProps = {
    entity: null,
};
Entity.propTypes = {
    entity: React.PropTypes.object,
};
