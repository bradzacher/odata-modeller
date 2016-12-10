import React from 'react';
import ReactDOM from 'react-dom';

export default class Association extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            top: 0,
            height: 0,
            width: 0,
        };
    }

    shouldComponentUpdate(nextProps) {
        return this.props.association !== nextProps.association ||
            this.props.end1 !== nextProps.end1 ||
            this.props.end2 !== nextProps.end2;
    }

    componentWillReceiveProps(nextProps) {
        const { end1, end2 } = nextProps;

        // figure out the canvas's size
        const left = Math.min(end1.left, end2.left);
        const top = Math.min(end1.top, end2.top);

        const right = Math.max(end1.left + end1.width, end2.left + end2.width);
        const bottom = Math.max(end1.top + end1.height, end2.top + end2.height);

        const height = bottom - top;
        const width = right - left;

        this.setState({
            left,
            top,
            height,
            width,
        });
    }


    getEntityMiddle(entity) {
        return {
            left: (entity.left - this.state.left) + (entity.width / 2),
            top: (entity.top - this.state.top) + (entity.height / 2),
        };
    }

    componentDidUpdate() {
        const canvas = ReactDOM.findDOMNode(this);
        const ctx = canvas.getContext('2d');

        // figure out where to draw the lines
        const pos1 = this.getEntityMiddle(this.props.end1, canvas);
        const pos2 = this.getEntityMiddle(this.props.end2, canvas);

        // draw the line
        ctx.beginPath();
        ctx.moveTo(pos1.left, pos1.top);
        ctx.lineTo(pos2.left, pos2.top);
        ctx.stroke();
    }

    render() {
        console.renderLog('Association');

        return (
            <canvas style={{
                position: 'absolute',
                top: this.state.top,
                left: this.state.left,
                height: this.state.height,
                width: this.state.width,
            }} width={this.state.width} height={this.state.height} />
        );
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
