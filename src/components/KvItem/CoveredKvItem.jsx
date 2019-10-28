import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1
    },
    keyArea: {
        height: '17px',
        width: '37%',
        marginBottom: 6,
        backgroundColor: 'rgb(235, 236, 236)'
    },
    valueArea: {
        height: '25px',
        width: '100%',
        backgroundColor: 'rgb(235, 236, 236)'
    }
});

function CoveredKvItem(props) {
    const { classes, className } = props;

    let classNameWrap = classes.root;
    if (className) {
        classNameWrap += ' ' + className;
    }

    return (
        <div className={classNameWrap}>
            <div className={classes.keyArea}></div>
            <div className={classes.valueArea}></div>
        </div>
    )
}
// class CoveredKvItem extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }
//     render() {
//         const { classes, className, keyName, value, style = {}, sign } = this.props;
//         // const { isHidden, stage} = this.state;
//         let classNameWrap = classes.root;
//         if (className) {
//             classNameWrap += ' ' + className;
//         }
//         return (
//             <div className={classNameWrap}>
//                 <div className={classes.keyName} style={style.keyName}>{keyName}</div>
//                 <div className={classes.valueContent}>
//                     {/* {
//                         sign ? <div className={classes.sign}>{sign}</div> : null
//                     } */}
//                     <div className={classes.value} style={style.value}>{value}</div>
//                     {
//                         sign ? <div className={classes.sign}>{sign}</div> : null
//                     }
//                 </div>
//                 {/* <div className={classes.value} style={style.value}>{value}</div> */}
//             </div>
//         );
//     }
// }
CoveredKvItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CoveredKvItem);