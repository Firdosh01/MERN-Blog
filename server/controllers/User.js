import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res) => {
    if(req.user.id !== req.params.userId){
        return res.status(403).json({ message: "You are not allowed to update this user" });
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return res.status(400).json({ message: "Username must be between 7 and 20 characters"});
        }
        if(req.body.username.includes(' ')){
            return res.status(400).json({ message: "Username cannot contain spaces" });
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return res.status(400).json({ message: "Password must be lowercase" });
        }
        if(req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return res.status(400).json({ message: "Username can only contain letters and numbers"});
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, { new: true });
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest); 
        }
        catch(err){
            res.status(500).json({ message: err });
        }
    }
}