import React from 'react';
import { Icon, ListItem, ListItemContent, ListItemAction, Tooltip } from 'react-mdl';

export default class NavProperty extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    shouldComponentUpdate(nextProps) {
        return this.props.property !== nextProps.property;
    }

    render() {
        if (!this.props.property) {
            return (<div />);
        }

        const itemStyle = {
            // make the row full-bleed by expanding it past the parent padding
            backgroundColor: '#add8e6',
            width: 'calc(100% + 16px)',
            marginLeft: '-8px',
            paddingLeft: '16px',
            paddingRight: '16px',
        };

        return (
            <ListItem style={itemStyle}>
                <ListItemContent>{this.props.property.name}</ListItemContent>
                <ListItemAction>
                    <Tooltip label='Navigation Property'>
                        <Icon name='call_missed_outgoing' />
                    </Tooltip>
                </ListItemAction>
            </ListItem>
        );
    }
}

NavProperty.defaultProps = {
    property: null,
};
NavProperty.propTypes = {
    property: React.PropTypes.object,
};
