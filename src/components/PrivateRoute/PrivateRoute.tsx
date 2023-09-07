import { Navigate } from "react-router-dom"
import { getToken } from "../../utils/tokenManagement"
import { loginRoute } from "../../constants/routes"

const PrivateRoute = (props:any) =>{
    const {children} = props
    const token = getToken()
    if(token){
        return children
    }
    return <Navigate to={loginRoute} />
}

export default PrivateRoute