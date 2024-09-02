
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsBdNMUxiLlp7ZG4yOAfrv2CAH_P50EyE",
  authDomain: "chat-app-project-43ac5.firebaseapp.com",
  projectId: "chat-app-project-43ac5",
  storageBucket: "chat-app-project-43ac5.appspot.com",
  messagingSenderId: "919582811739",
  appId: "1:919582811739:web:1db9da8db3630ee558c17e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;