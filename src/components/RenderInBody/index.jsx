import React, { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        top: '0px',
        top: '0px',
        top: '0px',
        top: '0px',
        position: 'fixed',
        zIndex: '1200',
        visibility: 'hidden' //子元素需要设置visibility:visible才能显示
    }
});

// function RenderInProps(props) {
//     // const { list = initialList, classes } = props;
//     const { classes } = props;
//     const [popup, setPopup] = useState(document.createElement('div'));

//     const _renderLayer = () => {
//         console.log('in the renderLayer function');
//         ReactDOM.render(props.children, popup);
//         console.log('rerender completed');
//     }

//     useEffect(() => {
//         document.body.appendChild(popup);
//         console.log('the one-time effect is running');
//         function unmountComponent() {
//             ReactDOM.unmountComponentAtNode(popup);
//             document.body.remove(popup);
//             console.log('unmount RenderInProps');
//         }
//         return unmountComponent;
//     }, [])

//     useEffect(() => {
//         console.log('rerender the renderInProps');
//         console.timeEnd('show list');
//         _renderLayer();
//     })

//     return null;
// }

class RenderInProps extends Component {
    constructor(props) {
        super(props);
        this.popup = document.createElement('div');
        this.popup.style = "top: 0; bottom: 0; right: 0; left: 0; position: fixed; z-index: 1200; visibility: hidden";
    }

    componentDidMount() {
        document.body.appendChild(this.popup);
        this._renderLayer();
    }

    componentDidUpdate() {
        this._renderLayer();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.popup);
        document.body.removeChild(this.popup);
    }

    _renderLayer = () => {
        ReactDOM.render(this.props.children, this.popup, this.props.callback || function () { });
        // ReactDOM.render(this.props.children, this.popup);
    }

    render() {
        return null;
    }
}

export default withStyles(styles)(RenderInProps);