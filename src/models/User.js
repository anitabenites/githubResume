// User model that handles all calls to the API endpoint

export class UserModel {
  static findByUsername(username) {
    return fetch(`http://api.github.com/users/${username}`)
    .then(function(response) {
      if (!response.ok) {
        return response; // {body: {}, ok: boolean, status: number}
      }
      return response.json(); // it will only return the main response body no header!! {body: {}}
    })
  }

  static findUserRepos(username) {
    return fetch(`http://api.github.com/users/${username}/repos?per_page=100`)
    .then(response => {
      if (!response.ok) {
        return response;
      }
      return response.json();
    })
  }

}
