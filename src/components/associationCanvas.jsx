import React from 'react';
import ReactDOM from 'react-dom';

export default class AssociationCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.nextFrame = null;
        this.children = new Map();

        this.draw = this.draw.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props.height !== nextProps.height ||
            this.props.width !== nextProps.width ||
            this.props.children !== nextProps.children;
    }

    draw() {
        // we've got a render pending, so don't queue another
        if (this.nextFrame) {
            return;
        }

        const canvas = ReactDOM.findDOMNode(this);
        const ctx = canvas.getContext('2d');

        // we render within an animation frame to make sure that we can batch as much as possible
        // i.e. try to only render 60 times per second
        this.nextFrame = window.requestAnimationFrame(() => {
            // resize the canvas appropriately
            canvas.height = this.props.height;
            canvas.width = this.props.width;

            // clear the last render
            ctx.clearRect(0, 0, this.props.width, this.props.height);

            // render the children
            this.children.forEach((c) => {
                c && c.draw(ctx);
            });

            this.nextFrame = null;
        });
    }

    componentDidMount() {
        // initial render complete, so draw
        this.draw();
    }
    componentDidUpdate() {
        // props updated, so draw
        this.draw();
    }

    render() {
        console.renderLog('AssociationCanvas');

        // add the ref property to each child
        const children = React.Children.map(this.props.children, c =>
            React.cloneElement(c, {
                ref: (r) => {
                    this.children.set(c.key, r);
                },
            }));

        return (
            <canvas style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: this.props.height,
                width: this.props.width,
            }} >
                {children}
            </canvas>
        );
        //width={this.props.width} height={this.props.height}
    }
}

AssociationCanvas.defaultProps = {
    height: null,
    width: null,
};
AssociationCanvas.propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
};
