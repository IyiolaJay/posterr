

//400
export const ErrInvalidEmail = new Error("Invalid email");
export const ErrInvalidPassword = new Error("Invalid Password");
export const ErrTokenIsRequired = new Error("User auth token is required");
export const ErrInvalidOTP = new Error("Invalid OTP");


//406
export const ErrEmailAlreadyExists = new Error("Email already exists");
export const ErrResourceAlreadyExists = new Error("Resource already exists");
export const ErrMissingKeyFields = new Error("Missing Key Fields");


//404
export const ErrResourceNotFound = new Error("Resource not found");
export const ErrUserNotFound = new Error("No user found");
export const ErrRequestNotFound = new Error("Request not found")
export const ErrCategoryNotFound = new Error("Category not found");

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
        case ErrCategoryNotFound:
            code = 404;
            break;

        case ErrEmailAlreadyExists:
        case ErrResourceAlreadyExists:
        case ErrMissingKeyFields:
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