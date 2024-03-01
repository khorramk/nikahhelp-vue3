
export const InitRoute =  (to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    // ApiService.get('/v1/user')
    //         .then(() => {
    //             debugger;
    //             return next();
    //         }).catch(() => {
    //             debugger;
    //             return to.name == 'Login' ? next() : next({ name: 'Login' });
    //         })
    if((!token && to.name == 'VerifyEmail') || (token && to.name == 'VerifyEmail' && user.is_verified == 0)) {
        return next();
    }
    else if (!token && to.name == 'Signup') {
        return next();
    }
    else if (!token && to.name == 'Home') {
        return next();
    }
    else if(!token && to.name == 'ForgetPassword') {
        return next();
    }
    else if (!token) {
        return to.name == 'Login' ? next() : next({ name: 'Login' });
    }
    else if(user && token && to.name == 'ForgetPassword') {
        return next({name: 'Home'});
    }
    else if(user && token && user.is_verified == 1 && to.name == 'VerifyEmail') {
        return next({ name: 'ManageTeam' });
    }
    else if (user && !user.account_type) {
        next({ name: 'AdminDashboard' });
    }
    else if (user.is_verified == 0) {
        return to.name == 'EmailVerification' ? next() : next({ name: 'EmailVerification' });
    }
    else if (user && to.name == 'Admin' && (user.account_type == 1 || user.account_type == 2)) {
        return to.name == 'DHome' ? next() : next({ name: 'DHome' });
    }

    else if (user.account_type === 1 && user.form_type === 2 && user.data_input_status < 3) {

        return to.name == 'CandidateShortRegistration' ? next() : next({ name: 'CandidateShortRegistration' });
    }

    else if(user.account_type === 1 && user.form_type === 1 && user.data_input_status < 6) {
        return to.name == 'CandidateRegistration' ? next() : next({ name: 'CandidateRegistration' });
    }

    else if (user.account_type === 1 && user.form_type === 2 && user.data_input_status == 3 && from.name === 'CandidateShortRegistration') {

        return to.name == 'ManageTeam' ? next() : next({ name: 'ManageTeam' });
    }

    // else if (user.account_type === 1 && user.form_type === 1 && (user.data_input_status <= 5 || user.status == '4')) {

    //     return to.name == 'CandidateRegistration' ? next() : next({ name: 'CandidateRegistration' });
    // }

    else if (user.account_type === 1 && user.form_type === 1 && user.data_input_status > 5 && from.name === 'CandidateRegistration') {

        return to.name == 'ManageTeam' ? next() : next({ name: 'ManageTeam' });
    }

    // else if (user.account_type === 2 && (user.data_input_status <= 3 || user.status == '4')) {
    //     return to.name == 'RepresentativeRegistration' ? next() : next({ name: 'RepresentativeRegistration' });
    // }

    else if (user.account_type === 2 && user.data_input_status <= 3) {
        return to.name == 'RepresentativeRegistration' ? next() : next({ name: 'RepresentativeRegistration' });
    }

    else if (user.account_type === 2 && user.data_input_status > 3 && from.name === 'RepresentativeRegistration') {
        return to.name == 'ManageTeam' ? next() : next({ name: 'ManageTeam' });
    }

    else if (user && (to.name == 'Signup' || to.name == 'Login' || user && to.name == 'Home')) {
        return to.name == 'root' ? next() : next({ name: 'root' });
    }
    else {
        next();
    }

}
export const InitAdminRoute = (to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token && to.name == 'Home') {
        return next();
    }
    else if (!token) {
        return to.name == 'AdminLogin' ? next() : next({ name: 'AdminLogin' });
    }
    else {
        next();
    }

}

export function lazyLoadView(folderName, view) {
    return () => import(`@/views/${folderName}/${view}.vue`  /* webpackChunkName: "[request]" */)
}
export function lazyLoadComponent(folderName, component) {
    return () => import(`@/components/${folderName}/${component}.vue` /* webpackChunkName: "[request]" */)
}