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