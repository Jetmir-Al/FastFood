import './addUsers.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toggleManageUsers } from '../../../UserContext/AdminContext';

const AddUsers = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const { setAddUser, GetUsers } = useContext(toggleManageUsers);

    const [badInfo, setBadInfo] = useState(false);
    const BadInfo = () => setBadInfo(true);


    const signUp = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/signup', { name, email, psw, phone, role })
            setAddUser(a => !a);
            GetUsers();
        } catch (err) {
            console.log("Diqka shkoj keq: " + err);
            if (err.response && err.response.data.message === "Signup failed") {
                BadInfo();
            }
        }
    }

    return (
        <div className='addUser'>
            <form className='addUserForm' onSubmit={signUp}>
                <p id="keq" className={badInfo ? null : 'displayBadInfo'}>Make sure to fill each field correctly!</p>
                <input className='signUpInput' type="text" placeholder='Name' required
                    onChange={(e) => setName(e.target.value)} />
                <input className='signUpInput' type="email" placeholder='Email' required
                    onChange={(e) => setEmail(e.target.value)} />
                <input className='signUpInput' type="password" placeholder='Password' required
                    onChange={(e) => setPsw(e.target.value)} />
                <input className='signUpInput' type="number" placeholder='Phone number' required onChange={(e) => setPhone(e.target.value)} />
                <select id="role" className='role' name="role" required value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="" disabled>Select role</option>
                    <option value="admin">Admin</option>
                    <option value="delivery">Delivery Man</option>
                </select>

                <div className='btn-conatiner'>
                    <button className='btn-login' type="submit">Submit</button>
                </div>
            </form>
        </div >
    );
}

export default AddUsers;