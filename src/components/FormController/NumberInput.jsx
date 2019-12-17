import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        // width: '51%'
        width: '190px'
    },
    label: {
        fontSize: '16px',
        fontWeight: '300',
        color: 'rgb(75, 139, 175)',
        whiteSpace: 'nowrap',
        marginBottom: '10px',
        paddingLeft: '4px'
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        height: '35px',
        color: 'rgb(75, 139, 175)',
        lineHeight: '35px'
    },
    numberArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid rgba(97,139,162,0.8)',
        borderRadius: '2px',
        height: '35px',
        width: '100px',
        fontSize: '16px',
        fontWeight: 400,
        margin: '0px 10px',
        boxSizing: 'border-box'
    },
    sign: {
        height: '35px',
        width: '35px',
        boxSizing: 'border-box',
        border: '2px solid rgba(97,139,162,0.8)',
        borderRadius: '5px',
        lineHeight: '28px',
        textAlign: 'center',
        fontSize: '24px',
        cursor: 'pointer',
        //取消双击选中文本
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        MsUserSelect: 'none',
        KhtmlUserSelect: 'none',
        userSelect: 'none'
    }
});




// function NumberInput(props) {
//     const { classes, className, title, rules = {}, defaultValue, data, name, saveData } = props;
//     const { step = 1, maxValue, minValue, required, unit } = rules;
//     let defaultValueWrap = Number.parseInt(defaultValue);
//     console.log('question number');
//     console.log(defaultValueWrap);

//     if (Object.is(NaN, defaultValueWrap)) {
//         if (typeof minValue === 'number') {
//             defaultValueWrap = minValue;
//         } else if (typeof maxValue === 'number') {
//             defaultValueWrap = maxValue;
//         } else {
//             defaultValueWrap = 0;
//         }
//     }

//     const [displayNum, setDisplayNum] = useState(defaultValueWrap);

//     const handleClick = (stepValue) => (event) => {
//         let newNum = displayNum + stepValue;
//         if (typeof maxValue == 'number' && displayNum > maxValue) {
//             newNum = maxValue;
//             setDisplayNum(newNum);
//         } else if (typeof minValue == 'number' && displayNum < minValue) {
//             newNum = minValue;
//             setDisplayNum(newNum);
//         } else if ((typeof maxValue == 'number' && newNum > maxValue) || (typeof minValue == 'number' && newNum < minValue)) {
//             newNum = displayNum;
//         } else {
//             setDisplayNum(newNum);
//         }
//         if (saveData) {
//             saveData(name, { isValid: true, data: newNum })
//         }
//     }

//     useEffect(() => {
//         if (saveData) {
//             if (typeof maxValue == 'number' && typeof minValue == 'number') {
//                 if (displayNum > maxValue || displayNum < minValue) {
//                     console.log('false: ' + name)
//                     saveData(name, { isValid: false, data: displayNum })
//                 } else {
//                     console.log('true: ' + name)
//                     saveData(name, { isValid: true, data: displayNum })
//                 }
//             } else {
//                 saveData(name, { isValid: true, data: displayNum })
//             }
//         }
//     }, [])

//     let classNameWrap = classes.root;
//     if (className) {
//         classNameWrap += ' ' + className;
//     }

//     return (
//         <div className={classNameWrap}>
//             <div className={classes.label}>
//                 {required ? `*${title}` : title}
//             </div>
//             <div className={classes.content}>
//                 <div className={classes.sign} onClick={handleClick(-1 * step)}>-</div>
//                 <div className={classes.numberArea}>
//                     <div>{displayNum}</div>
//                     {
//                         unit ? <div>{unit}</div> : null
//                     }
//                 </div>
//                 <div className={classes.sign} onClick={handleClick(step)}>+</div>
//             </div>
//         </div>
//     );
// }

class NumberInput extends React.Component {
    constructor(props) {
        super(props);

        const { rules = {}, defaultValue } = props;
        const { maxValue, minValue } = rules;
        let defaultValueWrap = Number.parseInt(defaultValue);
        if (Object.is(NaN, defaultValueWrap)) {
            if (typeof minValue === 'number') {
                defaultValueWrap = minValue;
            } else if (typeof maxValue === 'number') {
                defaultValueWrap = maxValue;
            } else {
                defaultValueWrap = 0;
            }
        }

        this.state = {
            displayNum: defaultValueWrap
        }

        this.timeID = null;
        this.mouseDownStartTime = null;
        this.speedStrategy = [{ wait: 0, speed: 1000 }, { wait: 3000, speed: 500 }, { wait: 5000, speed: 200 }, { wait: 7000, speed: 100 }];
        this.speedIndex = 0;
    }


    componentDidMount() {
        const { rules = {}, name, saveData } = this.props;
        const { maxValue, minValue } = rules;
        const displayNum = this.state.displayNum;

        if (saveData) {
            if (typeof maxValue == 'number' && typeof minValue == 'number') {
                if (displayNum > maxValue || displayNum < minValue) {
                    saveData(name, { isValid: false, data: displayNum })
                } else {
                    saveData(name, { isValid: true, data: displayNum })
                }
            } else {
                saveData(name, { isValid: true, data: displayNum })
            }
        }
    }

    submit = (stepValue) => {
        const { rules = {}, name, saveData } = this.props;
        const { maxValue, minValue } = rules;
        const displayNum = this.state.displayNum;

        let newNum = displayNum + stepValue;
        if (typeof maxValue == 'number' && displayNum > maxValue) {
            newNum = maxValue;
        } else if (typeof minValue == 'number' && displayNum < minValue) {
            newNum = minValue;
        } else if ((typeof maxValue == 'number' && newNum > maxValue) || (typeof minValue == 'number' && newNum < minValue)) {
            newNum = displayNum;
        }
        this.setState({
            displayNum: newNum
        })
        if (saveData) {
            saveData(name, { isValid: true, data: newNum })
        }
    }

    speedup = (stepValue) => {
        this.submit(stepValue);
        if (this.speedIndex < this.speedStrategy.length - 1) {
            if (Date.now() - this.mouseDownStartTime >= this.speedStrategy[this.speedIndex].wait) {
                clearInterval(this.timeID);
                this.speedIndex = this.speedIndex + 1;

                this.timeID = setInterval(() => {
                    this.speedup(stepValue)
                }, this.speedStrategy[this.speedIndex].speed);
            } else {
            }
        }
    }

    handleMouseDown = (stepValue) => (event) => {
        if (event.buttons !== 1) { return; }
        this.mouseDownStartTime = Date.now();
        this.submit(stepValue);

        this.timeID = setInterval(() => {
            this.speedup(stepValue);
        }, 1000);
    }

    handleMouseUp = () => {
        this.speedIndex = 0;
        clearInterval(this.timeID)
    }

    handleMouseLeave = () => {
        this.speedIndex = 0;
        clearInterval(this.timeID)
    }

    render() {
        const { classes, className, title, rules = {} } = this.props;
        const { step = 1, required, unit } = rules;
        let displayNum = this.state.displayNum;

        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        return (
            <div className={classNameWrap}>
                <div className={classes.label}>
                    {required ? `*${title}` : title}
                </div>
                <div className={classes.content}>
                    <div
                        className={classes.sign}
                        onMouseDown={this.handleMouseDown(-1 * step)}
                        onMouseUp={this.handleMouseUp}
                        onMouseLeave={this.handleMouseLeave}
                    >-</div>
                    <div className={classes.numberArea}>
                        <div>{displayNum}</div>
                        {
                            unit ? <div>{unit}</div> : null
                        }
                    </div>
                    <div
                        className={classes.sign}
                        onMouseDown={this.handleMouseDown(step)}
                        onMouseUp={this.handleMouseUp}
                        onMouseLeave={this.handleMouseLeave}
                    >+</div>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(NumberInput);