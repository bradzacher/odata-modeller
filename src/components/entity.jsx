import React from 'react';
import { Card, CardTitle, CardText } from 'react-mdl';

import PropertyList from './propertyList.jsx';

import store from '../flux/store';
import { entityMove, entityResize } from '../flux/actions/entityInteraction';

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
        this.movement = {
            x: 0,
            y: 0,
        };

        // the animation frame
        this.animationFrame = null;
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
        evt.preventDefault();

        this.movement.x += evt.screenX - this.lastEvent.x;
        this.movement.y += evt.screenY - this.lastEvent.y;

        this.lastEvent = {
            x: evt.screenX,
            y: evt.screenY,
        };

        if (this.animationFrame) {
            return;
        }

        // do the store update on the next possible animation frame
        // batch them to reduce the number of renders we need to do
        this.animationFrame = window.requestAnimationFrame(() => {
            store.dispatch(entityMove(this.movement, this.props.entity));

            // clear the movement
            this.movement = {
                x: 0,
                y: 0,
            };
            this.animationFrame = null;
        });
    }

    render() {
        console.renderLog('Entity');

        if (!this.props.entity) {
            return (<div />);
        }

        const containerStyles = {
            top: `${this.props.entity.position.top}px`,
            left: `${this.props.entity.position.left}px`,
        };

        const cardStyles = {
            width: `${this.props.entity.size.width}px`,
            height: `${this.props.entity.size.height}px`,
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
