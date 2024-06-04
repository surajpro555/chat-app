import jwt from 'jsonwebtoken';

const genrateTokenAndSetCookie = (id,res) => {
  const token= jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    expiresIn: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,   // cookie cannot be accessed or modified by the browser
    samesite: 'strict', // CSRF attacks protection and security vulnerabilities  
    secure: process.env.NODE_ENV === 'production' ? true : false,    
  });
}

export default genrateTokenAndSetCookie;