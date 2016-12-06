import React from 'react';
import { Icon, ListItem, ListItemContent, ListItemAction, Tooltip } from 'react-mdl';

export default class Property extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        if (!this.props.property) {
            return (<div />);
        }

        let icon = 'check_box';
        let iconText = 'Non-Nullable';
        if (this.props.property.isKey) {
            icon = 'vpn_key';
            iconText = 'Key';
        } else if (this.props.property.nullable) {
            icon = 'check_box_outline_blank';
            iconText = 'Nullable';
        }

        return (
            <ListItem>
                <ListItemContent>{this.props.property.name}</ListItemContent>
                <ListItemAction>
                    <Tooltip label={iconText}>
                        <Icon name={icon} />
                    </Tooltip>
                </ListItemAction>
            </ListItem>
        );
    }
}

Property.defaultProps = {
    property: null,
};
Property.propTypes = {
    property: React.PropTypes.object,
};
