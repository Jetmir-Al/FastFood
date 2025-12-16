// to be made
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';



export const LogIn = () => {

    let navigate = useNavigate();
    //to set the user we do that, if you just want to check
    // things do just user
    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [role, setRole] = useState('');

    const [badInfo, setBadInfo] = useState(false);
    const BadInfo = () => setBadInfo(true);

    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { email, psw, role });
            // console.log(response.data);
            const data = response.data;
            const userInfoDB = data[0]; //first row from db
            localStorage.setItem('user', JSON.stringify(userInfoDB))
            setUser(userInfoDB);
            navigate('/');

        } catch (err) {
            // console.log("Diqka shkoj keq: " + err);
            if (err.response && (err.response.data.message === "No user" || err.response.data.message === "Login failed")) {
                BadInfo();
            }
        }

    }
    return (
        <div className='login-Container'>
            <form className='loginForm' onSubmit={login}>
                <h1>Login</h1>
                <p id='diqka' className={badInfo ? null : 'displayBadInfo'}>Try a different email,password or role!</p>
                <input type="email" placeholder='Email' required
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' required
                    onChange={(e) => setPsw(e.target.value)} />
                <select id="role" className='role' name="role" required value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="" disabled>Select role</option>
                    <option value="customer">Customer</option>
                    <option value="delivery">Delivery Man</option>
                    <option value="admin">Admin</option>
                </select>

                <div className='btn-conatiner'>
                    <button className='btn-login' type="submit">Submit</button>
                    <Link to={"/"}>
                        <button className='btn-login' type='button'>
                            Cancel
                        </button>
                    </Link>
                </div>

            </form>
        </div>
    );
}



