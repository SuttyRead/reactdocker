const loginRegex = new RegExp("^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$");
const passwordRegex = new RegExp("(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$");
const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
const nameRegex = new RegExp("^[A-Z][a-z]{1,25}");

export function loginValidator(value: string) {
    return loginRegex.test(value);
}

export function emailValidator(value: string) {
    return emailRegex.test(value);
}

export function passwordValidator(value: string) {
    return passwordRegex.test(value);
}

export function nameValidator(value: string) {
    return nameRegex.test(value);
}

export function passwordMatchValidator(password: string, confirmPassword: string) {
    return password === confirmPassword;
}

export function dateValidator(birthday: string) {
    return Date.parse(birthday) < Date.now();
}
