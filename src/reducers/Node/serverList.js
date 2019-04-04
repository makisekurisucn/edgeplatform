const initialState = {
    list: [],
    loading: false
    };

const nodeListProcess = (nodeList) => {
    let leadername = nodeList.ServerName + "." + nodeList.ServerRegion;
    nodeList.Members.forEach(item => {
        if(item.Name === leadername){
            item.Leader = true;
        }
        else{
            item.Leader = false;
        }
        item.Dc = item.Tags.dc;
        item.Region = item.Tags.region;
    });
    return nodeList.Members;

};
    const ServerListRedu = (state = initialState, action) => {
      // alert(action.type);
      switch(action.type) {
        case 'JOB_GET_JOBLIST_START':
          return Object.assign({}, state, {loading: true});
        case 'NODE_UPDATE_SERVERLIST':
          return Object.assign({}, state, {loading: false, list: nodeListProcess(action.data.list)});
        default: 
          return state;
      }
    }
    export default ServerListRedu;