

//400
export const ErrInvalidEmail = new Error("Invalid email");
export const ErrInvalidPassword = new Error("Invalid Password");
export const ErrInvalidUserToken = new Error("Invalid user token");
export const ErrTokenIsRequired = new Error("User auth token is required");
export const ErrInvalidOTP = new Error("Invalid OTP");


//406
export const ErrEmailAlreadyExists = new Error("Email already exists");


//404
export const ErrResourceNotFound = new Error("Resource not found");
export const ErrUserNotFound = new Error("No user found");
export const ErrRequestNotFound = new Error("Request not found")
export const ErrOrderNotFound = new Error("Order not found");

//401
export const ErrUnauthorized = new Error("User not authorized");


//500
export const ErrInternalServer = new Error("Internal server error");


export const getErrorMessage = (error) => {
    let message = error.toString().replace("Error: ", "");
    let code  = 0;

    switch(error){
        case ErrInvalidEmail:
        case ErrInvalidPassword:
        case ErrInvalidUserToken:
        case ErrTokenIsRequired:
        case ErrInvalidOTP:
            code = 400;
            break;
        
        case ErrUnauthorized:
            code = 401;
            break;

        case ErrResourceNotFound:
        case ErrUserNotFound:
        case ErrRequestNotFound:
        case ErrOrderNotFound:
            code = 404;
            break;

        case ErrEmailAlreadyExists:
            code = 406;
            break;

        case ErrInternalServer:
            code = 500;
            break;
        
        default:
            code = 500;
            break;
    }
    const result = {
        code,
        message,
    }

    return result;
}