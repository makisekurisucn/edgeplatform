import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
const styles = theme => ({
    root: {
        height: 60,
        width: 180,
        boxSizing: 'border-box',
        lineHeight: '60px',
        textAlign: 'center',
        // padding: '0px 4px',
        fontSize: 18,
        color: "#EEF9FF",
        '&:hover': {
            backgroundColor: "#262E2F"
        },
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: 'rgb(51,66,69)'
    },
    selectedWrap: {
        backgroundColor: "#262E2F"
    },
    // selected: {
    //     height: 4,
    //     backgroundColor: '#4B8BAF',
    //     marginTop: -60
    // }
});
const hasRouter = (current, link) => {
    let currentArray = current.split('/');
    let linkArray = link.split('/');
    if (currentArray[0] === '') {
        currentArray.shift();
    }
    if (linkArray[0] === '') {
        linkArray.shift();
    }
    if (currentArray[currentArray.length - 1] === '') {
        currentArray.pop();
    }
    if (linkArray[linkArray.length - 1] === '') {
        linkArray.pop();
    }
    let isMatch = true;
    linkArray.forEach((item, index) => {
        if (!currentArray[index]) {
            isMatch = false;
        }
        else if (currentArray[index] !== item) {
            isMatch = false;
        }
    });
    return isMatch;


}
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this.unlisten = props.history.listen((location) => {
            this.setState({
                selected: hasRouter(location.pathname, props.link)
            });

        })
    }

    UNSAFE_componentWillMount() {
        this.setState({
            selected: hasRouter(this.props.location.pathname, this.props.link)
        });
    }

    UNSAFE_componentWillReceiveProps(nextProp) {
        if (nextProp.location.pathname && nextProp.link) {
            this.setState({
                selected: hasRouter(nextProp.location.pathname, nextProp.link)
            });
        }
    }

    componentWillUnmount() {
        this.unlisten();
    }

    goTo = (link) => (event) => {
        // if (!this.state.selected) {
        this.props.history.push(link);
        // }
    }
    render() {
        const { classes, content, link, className = {} } = this.props;
        const { selected } = this.state;
        let classNameWrap = '';
        if (selected) {
            classNameWrap = classes.root + ' ' + classes.selectedWrap + ' ' + (className.buttonRoot || '') + ' ' + (className.selectedBgc || '')
        }
        else {
            classNameWrap = classes.root + ' ' + (className.buttonRoot || '');
        }

        return (
            <div className={classNameWrap} onClick={this.goTo(link)}>
                <span>{content}</span>
                {
                    selected && (<div className={className.selected}></div>)
                }
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(Button));