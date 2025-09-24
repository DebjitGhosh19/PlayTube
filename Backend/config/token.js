import jwtToken from "jsonwebtoken";
export const createToken = async(userId) => {
try {
  const token = await jwtToken.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  console.log(token);
  
  return token;
} catch (error) {
  console.log(error);
  
}
};