import React from 'react';
import { List } from 'react-mdl';

import Property from './property.jsx';
import NavProperty from './navProperty.jsx';

export default class PropertyList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    shouldComponentUpdate(nextProps) {
        return this.props.properties !== nextProps.properties;
    }

    render() {
        console.renderLog('PropertyList');

        const properties = this.props.properties.map(p => (<Property property={p} key={p.name} />));
        const navProperties = this.props.navProperties.map(p => (<NavProperty property={p} key={p.name} />));

        return (
            <List>
                {properties}
                {navProperties}
            </List>
        );
    }
}

PropertyList.defaultProps = {
    properties: [],
};
PropertyList.propTypes = {
    properties: React.PropTypes.array,
};
