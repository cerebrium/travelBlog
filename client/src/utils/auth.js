import auth0 from "auth0-js"
import { navigate } from "gatsby"

var auth;
// cool
if (typeof window !== "undefined") {
    auth = new auth0.WebAuth({
      domain: 'dev-27fetw2x.auth0.com',
      clientID: 'TNv2VD9KHB2y4GVBuwrU1quybZKTcSOi',
      redirectUri: 'http://localhost:8000/callback/',
      responseType: "token id_token",
      scope: "openid profile email",
    })} else {
        auth = {}
    }

// insert after auth const
// another comment
const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!(typeof window !== "undefined")) {
    return;
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (! (typeof window !== "undefined")) {
    return
  }
  auth.authorize()
}

export const silentAuth = callback => {
    if (!isAuthenticated()) return callback()
    auth.checkSession({}, setSession(callback))
}

export const logout = () => {
localStorage.setItem("isLoggedIn", false)
auth.logout()
}

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    navigate("/")
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", true)
    navigate("/account")
    cb()
  }
}

export const handleAuthentication = () => {
  if (!(typeof window !== "undefined")) {
    return;
  }

  auth.parseHash(setSession())
}

export const getProfile = () => {
  return user
}