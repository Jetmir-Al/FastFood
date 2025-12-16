import { Users, delUser, updatedUserInfo } from "../database/database.js";


export const updatedUser = async (req, res) => {
    const { userID, name, email, passwordHash, phone, role } = req.body;
    try {
        const updatingUser = await updatedUserInfo(userID, name, email, passwordHash, phone, role);
        // console.log("Update user happened well!");
        res.status(201).json(updatingUser);

    } catch (err) {
        console.log("Diqka shkoi keq:", err);
        res.status(500).json({ message: "Update psw failed" });
    }
}

export const users = async (req, res) => {
    try {
        const viewUsers = await Users();
        return res.status(200).json(viewUsers);

    } catch (err) {
        console.log("Diqka shkoj keq", err);
    }
}

export const DeleteUser = async (req, res) => {
    const { userID } = req.body
    try {
        await delUser(userID);
        console.log("Deleted succesfully!")
        return res.status(204).send();


    } catch (err) {
        console.log("Diqka shkoj keq: ", err);
        res.status(500).json({ message: "Delete failed" });
    }
}

