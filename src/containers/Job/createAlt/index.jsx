import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { createJob, initCreateJob } from '../../../actions/Job';
import code from '../../../assets/img/code.jpg'
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/zh-cn';
import { NavLink } from 'react-router-dom'
const styles = theme => ({
    card: {
        maxWidth: 1000,
        margin: 'auto'
    },
    media: {
        //  object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    actionArea: {
        // float: 'right'
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        // color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    green: {
        background: 'green'
    }
});
class JobCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

        const { dispatch } = this.props;
        initCreateJob(dispatch);
    }
    handleChange = () => p => {
        console.log(p);
        if (p.jsObject) {
            this.setState({
                json: p.jsObject
            });
        }

    }
    handleCreate = e => {
        createJob(this.props.dispatch, this.state.json);
    }


    render() {
        const { classes, json, loading, success } = this.props;
        // const { json, loading } = this.state;

        return (
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.media}
                    height="140"
                    image={code}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        新建应用
          </Typography>
                    <JSONInput
                        width="100%"
                        placeholder={json}
                        locale={locale}
                        onChange={this.handleChange()}
                    ></JSONInput>
                </CardContent>
                <CardActions className={classes.actionArea}>
                    <div className={classes.wrapper}>

                        {!success ? <Button size="medium" color="primary" variant="contained" onClick={this.handleCreate} disabled={loading || success} >
                            新建
            </Button> : null}
                        {success ? <Button size="medium" color="primary" className={classes.green} variant="contained">
                            <CheckIcon />
                        </Button> : null}
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                    </div>
                    <Button size="medium" color="primary">
                        <NavLink to="/jobs">
                            取消
            </NavLink>
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
JobCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {

    return state.jobcreate;
}

export default connect(mapStateToProps)(withStyles(styles)(JobCreate));