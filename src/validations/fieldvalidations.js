import AXIOS from '../configurations/axiosinterceptor'

export function validateEmployeeId(empId) {
    var reg = /^\d+$/;
    if (!empId || empId.length > 3 || !reg.test(empId)) {
        return false;
    }
    return true;
}

export function validateEmployeeEmailId(email) {
    var reg = /^[a-zA-Z]+\.{1}[a-zA-Z]+@hdworks.in$/
    if (!email || email.length === 0 || !reg.test(email)) {
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
        AXIOS.get('user/by/id?id=' + empid).then((response) => {
            if (response && response.data && response.data.id == empid) {
                return true;
            }
        }).catch(error => {
            return false;
        })
    }
}