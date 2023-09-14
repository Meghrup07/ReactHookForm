import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/header/Header';

function Layout() {

    const navigate = useNavigate()

    const isAuth = useSelector((state: any) => state.auth.isAuthenicated);

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    }, [isAuth])

    return (
        <div>
            {isAuth ?
                <>
                    <Header />
                    <Outlet />
                </> : null}
        </div>
    )
}

export default Layout