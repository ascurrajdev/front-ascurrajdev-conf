export const authReducer = (state,action) => {
    switch (action.type){
        case 'login':
            return {
                isLoading:false,
                logged:true,
                user:action.payload
            }
        case 'not-auth':
            return {
                user:{},
                isLoading:false,
                logged:false
            }
        case 'logout':
            return {
                user:{},
                isLoading:false,
                logged:false
            }
        default:
            return state
    }
}