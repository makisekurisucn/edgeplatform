import { _X_Nomad_Token } from '../../utils/static';

const initialState = {
    hasToken: false,
    isTokenValid: false
};

const tokenProcess = (data) => {
    const { hasToken, isTokenValid, token } = data;
    if (hasToken === true && isTokenValid === true) {
        localStorage.setItem(_X_Nomad_Token, token);
        return {
            hasToken,
            isTokenValid
        };
    } else {
        localStorage.removeItem(_X_Nomad_Token);
        return {
            hasToken,
            isTokenValid
        }
    }
};
const tokenRedu = (state = initialState, action) => {
    // alert(action.type);
    switch (action.type) {
        case 'TOKEN_UPDATE_VALIDATION':
            return Object.assign({}, state, tokenProcess(action.data));
        default:
            return state;
    }
}
export default tokenRedu;