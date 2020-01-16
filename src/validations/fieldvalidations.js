import AXIOS from '../configurations/axiosinterceptor'

export function validateEmployeeId(empId) {
    var reg = /^\d+$/;
    if (!empId || empId.length > 3 || !reg.test(empId)) {
        return false;
    }
    return true;
}

export function validateEmployeeEmailId(email) {
    if (!email || email.length === 0) {
        return false;
    }
    return true;
}

export function validatePassword(password) {
    if (!password || password.length < 4 || password.length > 9) {
        return false;
    }
    return true;
}
export function isEmpty(source) {
    return !source || source.length === 0
}

export function isEmployeExists(empid) {
    if (validateEmployeeId(empid)) {
        //TODO get data from the server
        return true;
    }
    return true;
}