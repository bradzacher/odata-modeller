import React from 'react';
import extend from 'extend';
import { Card, CardTitle, CardText } from 'react-mdl';

import PropertyList from './propertyList.jsx';
import styles from '../index.scss';

const minWidth = 100;

export default class Entity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            minHeight: null,
            minWidth,
        };

        // reference to the container div in the DOM
        this.container = null;
    }

    componentDidMount() {
        // save the browser calculated height as the minimum height
        // this is so that the user can't hide properties on resize..
        // TODO - do we want this...?
        this.setState({
            minHeight: this.container.clientHeight,
        });
    }

    render() {
        if (!this.props.entity) {
            return (<div />);
        }

        const containerStyles = extend({
            minHeight: `${this.state.minHeight}px`,
            minWidth: `${this.state.minWidth}px`,

            overflow: 'visible',

            position: 'absolute',
            top: `${this.props.entity.top}px`,
            left: `${this.props.entity.left}px`,

            width: `${this.props.entity.width}px`,
            height: this.props.entity.height ? `${this.props.entity.height}px` : 'auto',

            // add a little padding so that the edge of the parent doesn't eat our nice shadows
            paddingBottom: '8px',
        }, this.props.style);

        const cardStyles = extend({
            overflow: 'hidden',
            width: `${this.props.entity.width}px`,
            height: this.props.entity.height ? `${this.props.entity.height}px` : 'auto',
        }, this.props.style);

        return (
            <div style={containerStyles} className={styles.entity} ref={(div) => { this.container = div; }}>
                <Card shadow={1} style={cardStyles}>
                    <CardTitle>{this.props.entity.name}</CardTitle>
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
    index: 0,
    style: {},
};
Entity.propTypes = {
    entity: React.PropTypes.object,
    index: React.PropTypes.number,
    style: React.PropTypes.object,
};
