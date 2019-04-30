const initialState = {
    regionList: []
    };
    const JobRedu = (state = initialState, action) => {
      // alert(action.type);
      switch(action.type) {
        case 'REGION_UPDATE':
          return Object.assign({}, state, {regionList: action.data.list});
        default: 
          return state;
      }
    }
    export default JobRedu;