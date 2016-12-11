import React from 'react';
import ReactDOM from 'react-dom';

export default class Association extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.recalculateState(props);
        this.nextFrame = null;
    }

    shouldComponentUpdate(nextProps) {
        return this.props.association !== nextProps.association ||
            this.props.end1.position !== nextProps.end1.position ||
            this.props.end2.position !== nextProps.end2.position ||
            this.props.end1.size !== nextProps.end1.size ||
            this.props.end2.size !== nextProps.end2.size;
    }

    recalculateState(props) {
        const { end1, end2 } = props;
        const end1Pos = end1.position;
        const end1Size = end1.size;
        const end2Pos = end2.position;
        const end2Size = end2.size;

        // figure out the canvas's size
        const left = Math.min(end1Pos.left, end2Pos.left);
        const top = Math.min(end1Pos.top, end2Pos.top);

        const right = Math.max(end1Pos.left + end1Size.width, end2Pos.left + end2Size.width);
        const bottom = Math.max(end1Pos.top + end1Size.height, end2Pos.top + end2Size.height);

        const height = bottom - top;
        const width = right - left;

        return {
            left,
            top,
            height,
            width,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.shouldComponentUpdate(nextProps)) {
            // don't do the calculations if nothing has changed
            return;
        }

        this.setState(this.recalculateState(nextProps));
    }

    draw() {
        const canvas = ReactDOM.findDOMNode(this);
        const ctx = canvas.getContext('2d');

        // we've got a render pending, so don't queue another
        if (this.nextFrame) {
            return;
        }

        this.nextFrame = window.requestAnimationFrame(() => {
            // figure out where to draw the lines
            const midpoint1 = {
                top: this.props.end1.midpoint.top - this.state.top,
                left: this.props.end1.midpoint.left - this.state.left,
            };
            const midpoint2 = {
                top: this.props.end2.midpoint.top - this.state.top,
                left: this.props.end2.midpoint.left - this.state.left,
            };

            // draw the line
            ctx.beginPath();
            ctx.moveTo(midpoint1.left, midpoint1.top);
            ctx.lineTo(midpoint2.left, midpoint2.top);
            ctx.stroke();

            this.nextFrame = null;
        });
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
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
