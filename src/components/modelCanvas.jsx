import React from 'react';
import extend from 'extend';

import Entity from './entity.jsx';

export default class ModelCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doc: null,
        };
    }

    render() {
        // no entity model? no render!
        if (!this.props.metadata) {
            return (<div />);
        }

        const entityDivs = [];
        let count = 0;
        this.props.metadata.entities.forEach((e) => {
            entityDivs.push(<Entity entity={e} index={count} key={e.name} />);
            count += 1;
        });

        const style = extend({
            position: 'relative',
            overflow: 'scroll',
            height: '100%',
            width: '100%',
        }, this.props.style);

        return (
            <div style={style}>
                {entityDivs}
            </div>
        );
    }
}

ModelCanvas.defaultProps = {
    style: {},
};
ModelCanvas.propTypes = {
    style: React.PropTypes.object,
};
