import React from 'react';
import { Icon, ListItem, ListItemContent, ListItemAction, Tooltip } from 'react-mdl';

export default class Property extends React.Component {
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

        let icon = 'check_box';
        let iconText = 'Non-Nullable';
        if (this.props.property.isKey) {
            icon = 'vpn_key';
            iconText = 'Key';
        } else if (this.props.property.nullable) {
            icon = 'check_box_outline_blank';
            iconText = 'Nullable';
        }

        const type = this.props.property.type;
        let typeTooltip = this.props.property.type.replace('Edm.', '');
        let typeShort = '';
        let useIcon = false;
        switch (type) {
            case 'Edm.Binary':
                useIcon = true;
                typeShort = 'exposure_zero';
                break;

            case 'Edm.Boolean':
                useIcon = true;
                typeShort = 'format_bold';
                break;

            case 'Edm.Byte':
                useIcon = true;
                typeShort = 'filter_8';
                typeTooltip = 'Unsigned Byte';
                break;

            case 'Edm.DateTime':
                useIcon = true;
                typeShort = 'date_range';
                break;

            case 'Edm.DateTimeOffset':
                useIcon = true;
                typeShort = 'event_note';
                break;

            case 'Edm.Time':
                useIcon = true;
                typeShort = 'access_time';
                break;

            case 'Edm.Decimal':
                useIcon = true;
                typeShort = 'pie_chart_outlined';
                typeTooltip = 'Signed Decimal';
                break;

            case 'Edm.Double':
                typeShort = 'D';
                typeTooltip = 'Signed Double Float';
                break;

            case 'Edm.Single':
                typeShort = 'F';
                typeTooltip = 'Signed Float';
                break;

            case 'Edm.Guid':
                useIcon = true;
                typeShort = 'language';
                break;

            case 'Edm.Int16':
                typeShort = 'S';
                typeTooltip = 'Signed Short';
                break;

            case 'Edm.Int32':
                typeShort = 'I';
                typeTooltip = 'Signed Int';
                break;

            case 'Edm.Int64':
                typeShort = 'L';
                typeTooltip = 'Signed Long';
                break;

            case 'Edm.SByte':
                typeShort = 'I8';
                typeTooltip = 'Signed Byte';
                break;

            case 'Edm.String':
                useIcon = true;
                typeShort = 'format_quote';
                break;

            default:
                useIcon = true;
                typeShort = 'help';
                break;
        }
        typeTooltip = `${typeTooltip} (${type})`;

        let typeElement;
        if (useIcon) {
            typeElement = <Icon name={typeShort} />;
        } else {
            typeElement = (
                <span className='material-icons'>
                    {typeShort}
                </span>
            );
        }

        return (
            <ListItem className='property'>
                <ListItemContent>{this.props.property.name}</ListItemContent>
                <ListItemAction>
                    <Tooltip label={iconText}>
                        <Icon name={icon} />
                    </Tooltip>
                    <Tooltip label={typeTooltip}>
                        {typeElement}
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
