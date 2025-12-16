import { Login, SignUp, deleteAccount } from "../database/database.js";


//signUp
export const handleSignUp = async (req, res) => {
    const { name, email, psw, phone, role } = req.body
    // console.log(req.body)
    try {
        const signupInfo = await SignUp(name, email, psw, phone, role);
        console.log("Signup happened well!")
        res.status(201).json(signupInfo);
    } catch (err) {
        console.log("Diqka shkoi keq:", err);
        res.status(500).json({ message: "Signup failed" });
    }
};

//login

export const handleLogin = async (req, res) => {
    const { email, psw, role } = req.body
    try {
        const loginInfo = await Login(email, psw, role);
        if (loginInfo.length > 0) {
            console.log("User found;");
            return res.json(loginInfo);
        }
        else {
            return res.status(404).json({ message: "No user" });
        }
    }
    catch (err) {
        console.log("Diqka shkoj keq", err);
        res.status(500).json({ message: "Login failed" });
    }
}

// delete account
export const handleDeleteAcc = async (req, res) => {
    const { email, psw, role } = req.body;
    try {
        await deleteAccount(email, psw, role);
        console.log("Deleted succesfully!")
        return res.status(204).send();


    } catch (err) {
        console.log("Diqka shkoj keq: ", err);
        res.status(500).json({ message: "Delete failed" });
    }
};