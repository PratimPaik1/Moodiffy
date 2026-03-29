import {BrowserRouter,Routes,Route} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

import Protected from './features/auth/components/Protected'
import Expression from './features/faces/pages/Expression'
import Home from './features/home/pages/Home'

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/' element={<Protected><Home/></Protected>}/>

                <Route path="/expression" element={<Expression/>}/>
                
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes