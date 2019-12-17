import { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        top: '0px',
        position: 'fixed',
        zIndex: '1200',
        visibility: 'hidden' //子元素需要设置visibility:visible才能显示
    }
});

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
    }

    render() {
        return null;
    }
}

export default withStyles(styles)(RenderInProps);