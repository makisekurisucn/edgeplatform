const postToken = (dispatch, token) => {
    dispatch({
        type: 'TOKEN_POSTTOKEN_SAGA',
        data: token
    });
}

const deleteToken = (dispatch) => {
    dispatch({
        type: 'TOKEN_UPDATE_VALIDATION',
        data: {
            hasToken: false,
            isTokenValid: false
        }
    });
}

export {
    postToken,
    deleteToken
};