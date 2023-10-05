import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../common/Header';

function Layout() {

    const navigate = useNavigate()

    const { token } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token])

    return (
        <div>
            {token ?
                <>
                    <Header />
                    <Outlet />
                </> : null}
        </div>
    )
}

export default Layout