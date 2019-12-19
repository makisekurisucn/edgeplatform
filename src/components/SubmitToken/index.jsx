import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { _X_Nomad_Token } from '../../utils/static';
import { postToken } from '../../actions/Token';


const styles = theme => ({
    root: {
        position: 'relative',
        padding: '130px',
        width: '650px'
    },
    title: {
        fontSize: '22px',
        fontWeight: '400',
        marginBottom: '10px'
    },
    explanation: {
        marginBottom: '30px'
    },
    label: {
        fontSize: '18px',
        marginBottom: '10px'
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    input: {
        height: '28px',
        width: '400px',
        padding: '2px 10px 0px 10px',
        marginRight: '30px',
        alignItems: 'center',
        fontSize: '16px'
    },
    btn: {
        height: '25px',
        width: '93px',
        lineHeight: '25px',
        textAlign: 'center',
        padding: '4px',
        cursor: 'pointer',
        color: '#EEF9FF',
        backgroundColor: '#4BAF7E',
        // 取消双击选中文字
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        MsUserSelect: 'none',
        KhtmlUserSelect: 'none',
        userSelect: 'none'
    },
    warning: {
        fontSize: '16px',
        color: 'red'
    }
});



class SubmitToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.input = null;
    }

    componentDidUpdate() {
        const { hasToken, isTokenValid } = this.props.tokenStatus;
        if (hasToken === true && isTokenValid === true) {
            window.location.reload();
        }
    }

    handleSubmit = () => {
        const { dispatch } = this.props;
        const token = this.input.value;
        postToken(dispatch, token)
    }

    render() {
        const { classes, tokenStatus } = this.props;
        const { hasToken, isTokenValid } = tokenStatus;

        return (
            <div className={classes.root}>
                <div className={classes.title}>访问权限控制</div>
                <div className={classes.explanation}>当前集群开启了访问权限控制，需要提供Token来对集群进行访问</div>
                <div>
                    <div className={classes.label}>Token</div>
                    <div className={classes.flex}>
                        <input
                            className={classes.input}
                            ref={ele => { this.input = ele }}
                            type={'text'}
                            placeholder={'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'}
                        />
                        {
                            hasToken && <div className={classes.warning}>输入的 Token 有误</div>
                        }
                    </div>
                    <div className={classes.btn} onClick={this.handleSubmit}>提交Token</div>
                </div>
            </div>
        );
    }
}
SubmitToken.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {
    return {
        tokenStatus: state.Token
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SubmitToken));