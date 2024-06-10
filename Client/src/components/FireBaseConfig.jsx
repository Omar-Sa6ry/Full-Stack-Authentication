import { initializeApp } from 'firebase/app'

const clientId = process.env.CLIENTID

const firebaseConfig = {
  apiKey: clientId,
  authDomain: 'omar-sabry.firebaseapp.com',
  projectId: 'omar-sabry',
  storageBucket: 'omar-sabry.appspot.com',
  messagingSenderId: '307306470433',
  appId: '1:307306470433:web:828c13b00a85be9ff55760',
  measurementId: 'G-B51SP6M5LP'
}

export const app = initializeApp(firebaseConfig)
