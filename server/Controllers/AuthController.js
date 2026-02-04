import { Login, SignUp, Status, deleteAccount } from "../database/database.js";
import { cookieConfig } from "../config/httpCookie.js";
import { signToken, verifyToken } from "../utils/jwt.js";

//signUp
export const handleSignUp = async (req, res) => {
    const { name, email, psw, phone, role } = req.body
    // console.log(req.body)
    try {
        const signupInfo = await SignUp(name, email, psw, phone, role);
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
        if (loginInfo) {
            const token = signToken({ userID: loginInfo.userID });
            res.cookie("access_token", token, cookieConfig)
            res.status(200).json(loginInfo);
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
// status
export const status = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token)
        console.log(payload.userID);

        const user = await Status(payload.userID);
        if (!user) {
            return res.status(401).json({ message: "Invalid sesion" });
        }
        return res.status(200).json({
            authenticated: true,
            user
        })


    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
}

export const logout = async (req, res) => {
    try {
        const { httpOnly, sameSite } = cookieConfig;

        const token = req.cookies.access_token;
        console.log(token);
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        res.clearCookie('access_token', { httpOnly, sameSite });
        res.status(200).json({ message: "Loged out" });
    } catch (err) {
        console.log(err);
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