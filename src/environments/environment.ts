// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    staging: false,
    endpoints: {
        baseURL: 'http://localhost:8080/api/v1',
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