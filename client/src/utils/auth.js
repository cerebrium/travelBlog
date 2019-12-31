import auth0 from "auth0-js"
import { navigate } from "gatsby"

var auth;

if (typeof window !== "undefined") {
    auth = new auth0.WebAuth({
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      redirectUri: process.env.CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })} else {
        auth = {}
    }

// insert after auth const
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
  console.log(auth)
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