import jwt from 'jsonwebtoken'; 




const genTokenAndCookie = (userId , res) => {
    const token = jwt.sign({userId}, process.env.SECRET_KEY);

    res.cookie('jwt', token, {
        maxAge : 15 * 24 * 60 * 60 * 1000 ,
        httpOnly : true ,
        sameSite : 'strict',
        secure : process.env.NODE_ENV !== 'development'
    })
}

export default genTokenAndCookie;