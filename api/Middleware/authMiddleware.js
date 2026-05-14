

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];  // Il token dovrebbe essere nel formato "Bearer <token>" 

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        req.user = user;
        next();
    });
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token missing." });
    }
    try {
        //Cerchiami nel database un utente con quel refresh token
        const user = await User.findOne({ refreshToken: refreshToken });
        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token." });
        }
        //Verifichiamo che il refresh token sia valido
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired refresh token." });
            }
            //Se il refresh token è valido, generiamo un nuovo token di accesso
            const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '20min' });
            res.json({ accessToken: accessToken });
        })
    }
    catch (error) {
        return res.status(403).json({ message: "Server error." });
    }
}

export const deleteToken =  async (req, res) => {
    const refreshToken = req.body.refreshToken;
    try {
        //Cerchiamo nel database un utente con quel refresh token
        await User.findOneAndUpdate(
            { refreshToken: refreshToken },
            { pull : {refreshToken: refreshToken} }
        );
        res.json({ message: "Logged out successfully." });
    } catch (error) {
        return res.status(403).json({ message: "Server error." });
    }
}