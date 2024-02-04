import jwt from 'jsonwebtoken';


export const test = (req, res) => {
    res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res) => {
    console.log(req.user)
}