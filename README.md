# Evenlty

- [Evenlty](#evenlty)
  - [Introduction](#introduction)
  - [Used API's](#used-apis)
    - [Firebase](#firebase)
  - [Testing](#testing)
    - [Jest](#jest)
    - [User testing](#user-testing)
  - [Installation](#installation)
  - [Maintainers](#maintainers)

## Introduction
Evenly is an application made for Cyprus. It is a technology platform. It is an event-management App that highlights interesting events around the country. It helps you quickly decide where to celebrate, listen to guest speakers, network, or just enjoy a night out. 

I have used React-Native to create this application which is an open-source mobile application framework created by Facebook.
With evenly you can create a new event. The created event can be viewed by users and attended. The user also can find the necessary information related to the event on the app which makes it a lot easier.  

## Used API's

### Firebase

Firebase is Google’s mobile application development platform that helps you build, improve, and grow your app. It provides developers with a variety of tools and services to help them develop quality apps, grows their user base, and earn profit. It is built on Google’s infrastructure. Firebase is categorized as a NoSQL database program, which stores data in JSON-like documents. <a href="https://medium.com/firebase-developers/what-is-firebase-the-complete-story-abridged-bcc730c5f2c0">More about Firebase...</a>

We have used firebase authentication to know the user’s identity, provide a customized experience, and keep the user’s data secure. <a href="https://firebase.google.com/docs/auth">More about authentication...</a>

We have also taken advantage of Firebase’s real-time database which is cloud-hosted. Data is stored as JSON and synchronized in real-time to every connected client. <a href="https://firebase.google.com/docs/database">More about database...</a>


## Testing

As your codebase expands, small errors and edge cases you don’t expect can cascade into larger failures. Bugs lead to bad user experience and ultimately, business losses. One way to prevent fragile programming is to test your code before releasing it into the wild.

Testing helps you uncover these mistakes and verifies that your code is working. Perhaps even more importantly, testing ensures that your code continues to work in the future as you add new features, refactor the existing ones, or upgrade major dependencies of your project. <a href="https://reactnative.dev/docs/testing-overview">Read more...</a>

### Jest

//TODO write tests

### User testing

For user testing, our goal was to lean more towards validation and evaluation. That is, finding out if users understand and enjoy our app, and whether the features meet their needs. For this, we leveraged early versions of our app, prototypes, and mockups. I have chosen for this a user that didn't know anything about my app and used it the first time.


## Installation

Assuming that you have [Node 12 LTS](https://nodejs.org/en/download/) or greater installed, you can use npm to install the Expo CLI command-line utility:

1. If needed, install code editor (+ extensions), git, npm</li>
2. Install Expo app to your phone. <a href="https://apps.apple.com/us/app/expo-client/id982107779">iOS</a>
   or <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fi">Android</a></li>
3. Install expo CLI: <code>npm install -g expo-cli</code></li>
4. Clone the project: <code>git@github.com:kurosh97/evently.git</code></li>

Create new directory and inside that folder 'keys'.

Inside secrets folder create a new file keys.jsx and copy/paste the following code snippet in it</li>

```
const firebaseConfig = {
  apiKey: '(FIREBASE_CONFIG)',
  authDomain: '(FIREBASE_CONFIG)',
  projectId: '(FIREBASE_CONFIG)',
  storageBucket: '(FIREBASE_CONFIG)',
  messagingsenderID: '(FIREBASE_CONFIG)',
  appId: '(FIREBASE_CONFIG)',
}

```

Test that app works:

run it and open it in your emulator(the interactive shell is needed to get the menu option (A) for launching the emulator)

        > cd evently
        > npm start


## Maintainers

@Kurosh Husseini <a href="https://github.com/kurosh97">Github Link...</a><br/>

