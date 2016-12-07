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

        return (
            <ListItem className='property nav-property'>
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
    className: '',
};
NavProperty.propTypes = {
    property: React.PropTypes.object,
    className: React.PropTypes.string,
};
