import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSpinner, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import './manageUsers.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddUsers from './ManUsersComp/AddUsers';
import UpdUsers from './ManUsersComp/UpdUsers'


const ManageUsers = () => {
    const [user, setUser] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const GetUsers = async () => {
        try {
            const usersDB = await axios.get('http://localhost:8080/user/viewUsers');
            setUser(usersDB.data);
        } catch (err) {
            console.log("Diqka shkoj keq", err);
        }
    };

    useEffect(() => {
        GetUsers();
    }, []);

    const DeleteUser = async (userID) => {
        try {
            await axios.delete('http://localhost:8080/user/delUser', { data: { userID } });
            GetUsers();
        } catch (err) {
            console.log("Diqka shkoj keq: " + err);
            if (err.response && (err.response.data.message === "Delete failed")) {
                console.log("Delete failed!");
            }
        }
    };

    const UpdateUser = (userID, name, email, passwordHash, phone, role) => {
        setUpdateUser(u => !u);
        setUserInfo({
            name: name,
            email: email,
            userID: userID,
            passwordHash: passwordHash,
            phone: phone,
            role: role,
        });
    }


    return (
        <div className="manageUsers-container">
            <div className='usersHeader'>
                <h2 className="header-title">Manage Users</h2>
                <button className="add-button"
                    onClick={() => setAddUser(u => !u)}>
                    {addUser ? 'Back' : 'Add'}
                </button>
            </div>
            {
                addUser ?
                    // {} use objects to pass functions or just more values
                    <toggleManageUsers.Provider value={{ setAddUser, GetUsers }}>
                        <AddUsers />
                    </toggleManageUsers.Provider>
                    :
                    updateUser ?
                        <toggleUpdateUsers.Provider value={{ setUpdateUser, GetUsers }}>
                            <UpdUsers id={userInfo.userID} names={userInfo.name} emails={userInfo.email} psw={userInfo.passwordHash} num={userInfo.phone} roles={userInfo.role} />
                        </toggleUpdateUsers.Provider> :
                        <div className="table-wrapper">
                            <table className="usersTable">
                                {
                                    user.length === 0 ? (
                                        <thead>
                                            <tr className="loading-container">
                                                <td colSpan={5} className="loading-cell">
                                                    <FontAwesomeIcon className="loading" icon={faSpinner} /> Try another time!
                                                </td>
                                            </tr>
                                        </thead>
                                    ) : (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th><FontAwesomeIcon icon={faEnvelope} /></th>
                                                    <th><FontAwesomeIcon icon={faPhoneVolume} /></th>
                                                    <th>Role</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user.map((res, index) => (
                                                    <tr key={index} className="user-row">
                                                        <td>{res.name}</td>
                                                        <td>{res.email}</td>
                                                        <td>{res.phone}</td>
                                                        <td>{res.role.toUpperCase()}</td>
                                                        <td className='tableBtns'>
                                                            <button className="update-btn"
                                                                onClick={() => UpdateUser(res.userID, res.name, res.email, res.passwordHash, res.phone, res.role)}>Update</button>
                                                            <button className="delete-btn" onClick={() => DeleteUser(res.userID)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </>
                                    )
                                }
                            </table>
                        </div>
            }
        </div>
    );
};

export default ManageUsers;
