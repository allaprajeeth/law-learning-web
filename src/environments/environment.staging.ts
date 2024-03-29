export const environment = {
    production: false,
    staging: true,
    endpoints: {
        baseURL: 'http://202.53.86.12:8080/api/v1',
        secureBaseURL: 'http://localhost:8080/api/v1/secure',
        s3BaseURL: 'https://elearning-stagging.s3.ap-south-1.amazonaws.com/',
        signUp: '/signup',
        signUpComplete: '/signup/complete',
        loginRequest: '/login/request',
        loginComplete: '/login/verify',
        logout: '/logout',
        forgotEmail: '/forgetEmail',
        forgotPhone: '/forgetPhone',
        libraries: '/libraries',
        auth: '/auth',
        secure: '/secure',
        search_courses: '/search-courses',
        course: '/courses'
    }
};