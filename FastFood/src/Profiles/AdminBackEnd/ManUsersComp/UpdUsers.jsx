import { useContext, useState } from "react";
import { toggleUpdateUsers } from "../../../UserContext/AdminContext";
import './updUser.css';
import axios from "axios";


const UpdUsers = ({ id, names, emails, psw, num, roles }) => {
    const { setUpdateUser, GetUsers } = useContext(toggleUpdateUsers);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPsw] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const UpdateUserDB = async (event) => {
        event.preventDefault();
        const userID = id;
        try {
            await axios.put('http://localhost:8080/user/updateUser', { userID, name, email, passwordHash, phone, role });
            setUpdateUser(u => !u);
            GetUsers();
        } catch (err) {
            console.log("Diqka shkoj keq: " + err);
            if (err.response && (err.response.data.message === "Update psw failed")) {
                console.log("Update failed!")
            }
        }
    }

    return (
        <div className="updateUserContainer">
            <div className="userInfo">
                <h3> Current Info </h3>
                <div className="info">
                    <p><strong>Username:</strong> {names}</p>
                    <p><strong>Email:</strong> {emails}</p>
                    <p><strong>Password:</strong> {psw}</p>
                    <p><strong>Phone:</strong> {num}</p>
                    <p><strong>Role:</strong> {roles.toUpperCase()}</p>
                </div>
            </div>
            <form className="updateForm" onSubmit={UpdateUserDB}>
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
                    <option value="customer">Customer</option>
                    <option value="delivery">Delivery Man</option>
                </select>

                <div className='btn-conatiner'>
                    <button className='btn-login' type="submit">Submit</button>
                    <button className='btn-login'
                        onClick={() => setUpdateUser(u => !u)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default UpdUsers;