import React from 'react';

export default class Association extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps) {
        return this.props.association !== nextProps.association ||
            this.props.end1.midpoint !== nextProps.end1.midpoint ||
            this.props.end2.midpoint !== nextProps.end2.midpoint;
    }

    render() {
        console.renderLog('Association');
        return null;
    }

    draw(ctx) {
        // draw the line
        ctx.beginPath();
        ctx.moveTo(this.props.end1.midpoint.left, this.props.end1.midpoint.top);
        ctx.lineTo(this.props.end2.midpoint.left, this.props.end2.midpoint.top);
        ctx.stroke();
    }
}

Association.defaultProps = {
    association: null,
    end1: null,
    end2: null,
};
Association.propTypes = {
    assocation: React.PropTypes.object,
    end1: React.PropTypes.object,
    end2: React.PropTypes.object,
};
