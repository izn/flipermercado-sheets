import config from '../config'

class GoogleAPI {
  static init(callback) {
    const script = document.createElement('script')

    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => window.gapi.load('client:auth2', () => {
      this.authInstance(callback)
    })

    document.body.appendChild(script)
  }

  static authInstance(callback) {
    const _this = this

    window.gapi.auth2.init({
      clientId: config.clientId,
      scope: config.scopes
    }).then(function (response) {
      let isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn

      isSignedIn.listen(() => _this.loadSheetsAPI(callback))
      _this.loadSheetsAPI(isSignedIn.get(), callback)
    })
  }

  static loadSheetsAPI(isSignedIn, callback) {
    if (isSignedIn) {
      window.gapi.client.load('sheets', 'v4', callback)
    }
  }

  static signInAction() {
    window.gapi.auth2.getAuthInstance().signIn()
  }
}

export default GoogleAPI
