export default class UserService {

    baseUrl = 'http://10.10.103.100:9000';

    headerForGuest = {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    };

    headerForLoggedInUser = {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Basic ${sessionStorage.getItem('token')}`
        }
    };

    getAllUsers() {
        return fetch(this.baseUrl + '/users', this.headerForLoggedInUser);
    }

    getUserById(id) {
        return fetch(this.baseUrl + '/users/' + id, this.headerForLoggedInUser);
    }

    getUserByLogin(login) {
        return fetch(this.baseUrl + '/checkLogin/' + login, this.headerForGuest);
    }

    login(loginForm) {
        return fetch(this.baseUrl + '/login', {
            method: 'POST',
            headers: this.headerForGuest.headers,
            body: JSON.stringify(loginForm)
        });
    }

    add(userForm) {
        return fetch(this.baseUrl +  + '/users', {
            headers: this.headerForLoggedInUser.headers,
            method: 'POST',
            body: JSON.stringify(userForm)
        });

    }

    registration(userForm) {
        return fetch(this.baseUrl + '/registration', {
            method: 'POST',
            headers: this.headerForGuest.headers,
            body: JSON.stringify(userForm)
        });
    }

    edit(user) {
        return fetch(this.baseUrl + '/users/' + user.id, {
            method: 'PUT',
            headers: this.headerForLoggedInUser.headers,
            body: JSON.stringify(user)
        });
    }

    delete(id) {
        return fetch(this.baseUrl + '/users/' + id, {
            method: 'DELETE',
            headers: this.headerForLoggedInUser.headers
        });
    }

    logout() {
        sessionStorage.clear();
    }

    loggedIn() {
        return sessionStorage.getItem('token');
    }

    isAdmin() {
        return sessionStorage.getItem('role') === "ADMIN";
    }

}