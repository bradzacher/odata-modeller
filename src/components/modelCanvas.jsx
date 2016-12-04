import React from 'react';

import EntityComponent from './entityComponent.jsx';

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
            entityDivs.push(<EntityComponent entity={e} index={count} key={count} />);
            count += 1;
        });

        return (
            <div style={{ position: 'relative', overflow: 'scroll', height: '100%', width: '100%' }}>
                {entityDivs}
            </div>
        );
    }
}
