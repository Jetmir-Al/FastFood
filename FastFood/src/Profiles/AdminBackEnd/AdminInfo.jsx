import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../../UserContext/Context";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminInfo = () => {
    const [updatePsw, setUpdatePsw] = useState(false);
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [psw, setNewPsw] = useState('');

    const UpdatePsw = async (event) => {
        event.preventDefault();
        const userID = user.userID;
        try {
            const res = await axios.put('http://localhost:8080/update/updatePsw', { psw, userID })
            const { passwordHash } = res.data;
            setUser(c => ({ ...c, passwordHash }));


        } catch (err) {
            console.log("Diqka shkoj keq: " + err);
            if (err.response && (err.response.data.message === "Update psw failed")) {
                console.log("Update failed!")
            }
        }
    }
    function logOut() {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
        console.log("User loged out");
    }

    const deleteAcc = async () => {
        const { email, psw, role } = user;
        try {
            await axios.delete('http://localhost:8080/deleteAcc', { data: { email, psw, role } })
            console.log("Deleted succesfully!")
            logOut();

        }
        catch (err) {
            console.log("Diqka shkoj keq: " + err);
            if (err.response && (err.response.data.message === "Delete failed")) {
                console.log("Delete failed!")
            }
        }

    }

    const upperCaseRole = user.role.toUpperCase();

    return (
        <div className='info-container'>
            <div className='accInfo'>
                <h1>{user.name}</h1>
                <h3>{upperCaseRole}</h3>
                <div className='accInfo-extra'>
                    <h3><FontAwesomeIcon className='icons' icon={faEnvelope} /> {user.email}</h3>
                    <h3> <FontAwesomeIcon className='icons' icon={faPhoneVolume} /> {user.phone}</h3>
                    {
                        updatePsw ? <form className="updatePsw" onSubmit={UpdatePsw}>
                            <input className='inputPsw' type="password" placeholder="Enter your new password" onChange={(e) => setNewPsw(e.target.value)} />
                            <div className="accinfo-btns">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => setUpdatePsw(p => !p)}>Cancel</button>
                            </div>
                        </form> : <button className='updatePswBtn'
                            onClick={() => setUpdatePsw(p => !p)}>
                            Update password
                        </button>
                    }
                </div>
                <div className="accountManagment">
                    <button onClick={() => logOut()}>Logout</button>
                    <button onClick={() => deleteAcc()}>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default AdminInfo;