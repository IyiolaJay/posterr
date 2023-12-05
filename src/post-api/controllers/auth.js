import { AuthService} from "../services/app/authService.js";
import { getErrorMessage } from "../../errors/index.js";



export const createAccount = async (req, res)=>{ 
try{
    const userReq = req.body;
    await AuthService.createUserAccountService(userReq);
    
    res.status(201).json({
        message : "Account created",
    })
    return;
}
catch(error){
    console.log(error);
    const result = getErrorMessage(error);
    res.status(result.code).json({error : result});
    return;
}

}

export const userLogin = async (req, res) => {
try{
    const {email , password} = req.body;
    const user = await AuthService.userLoginService(email, password);
    return res.status(200).json({
        message : "User logged in",
        token : user.token,
    })
}catch(error){
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({error :result});
}
};


export const forgotPassword = async(req, res)=>{
    try{
    const { email } = req.body;
    await AuthService.forgotPasswordService(email);
    res.status(200).json({ message: "Otp sent to email" });
    return;
    }catch(error){
        console.log(error);
        const result = getErrorMessage(error);
        return res.status(result.code).json({error :result});
    };
}

export const changeUserPassword = async (req, res) => {
    try {
      const code  = req.params.otp;
      const {password} = req.body;
      
      await AuthService.changeUserPasswordService(code, password);
  
      res.status(200).json({ message: "password change successful" });
      return;
    } catch (error) {
        console.log(error);
        const result = getErrorMessage(error);
        return res.status(result.code).json({error :result});
    }
  };