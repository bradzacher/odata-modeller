import React from 'react';

export default class PropertyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        if (!this.props.property) {
            return (<div />);
        }

        return (<div>{this.props.property.name}</div>);
    }
}

PropertyComponent.defaultProps = {
    property: null,
};
PropertyComponent.propTypes = {
    property: React.PropTypes.object,
};
