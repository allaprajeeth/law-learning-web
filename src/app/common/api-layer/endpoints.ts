//endpoints.ts

export const endPoints = {
    baseURL: 'http://192.168.1.42:8080/api/v1',
    s3BaseURL:'https://elearning-stagging.s3.ap-south-1.amazonaws.com/',
    signUp : '/signup',
    signUpComplete: '/signup/complete',
    loginRequest:'/login/request',
    loginComplete:'/login/verify',
    logout:'/logout',
    forgotEmail:'/forgetEmail',
    forgotPhone:'/forgetPhone',
    libraries: '/libraries',
    auth: '/auth',
    secure: '/secure'
}