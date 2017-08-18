import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function socialLogin (provider) {
  if(provider == 'google') {
    provider = new firebaseAuth.GoogleAuthProvider();
  }
  if(provider == 'facebook') {
    provider = new firebaseAuth.FacebookAuthProvider();
  }
  if(provider == 'twitter') {
    provider = new firebaseAuth.TwitterAuthProvider();
  }
  return firebaseAuth().signInWithPopup(provider)
    .then(saveUser)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
