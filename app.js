// get element by ID

let email = document.getElementById("email");
let password = document.getElementById("password");





// function of gotoSignUp()

function gotoSignUp() {

    window.location.replace("index1.html");
}





// function of gotoSignUp()

function gotoLogin() {

    window.location.replace("index.html");
}




// function  of  SignUp()

function SignUp() {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((result) => {

        alert("user signup successfully")

        window.location.replace("index.html")
        // console.log(result)

    })



        .catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;


            alert(errorMessage)
        });
}



// function  of  Login()


function Login() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then((result) => {
        alert("user login successfully")
        // var locate = window.location.href
        // console.log(locate)

        window.location.replace("index2.html")
        // console.log(result)
    }).catch((error) => {
        var errorMessage = error.message;

        alert(errorMessage);
    })
}



// function  of  GoogleLogin()

function GoogleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            let create_users = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                uid: user.uid,
            }

            firebase.database().ref('/').child(`users/${user.displayName}`).set(create_users).then(() => {
                alert(user.displayName + " is login successfull")
                window.location.replace("index2.html");
                // console.log(create_google_users);
            })
                .catch()

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert(errorMessage);
            // alert(email);
        });


}

// function  of  FacebookLogin()


function facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;
            let create_users = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                uid: user.uid,
            }

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            // console.log(user);

            firebase.database().ref('/').child(`users/${user.displayName}`).set(create_users).then(() => {
                alert(user.displayName + " is login successfull")
                window.location.replace("index2.html");
            })
                .catch()

        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            alert(errorMessage);

        });
}




// function  of  Logout()

function Logout() {
    firebase.auth().signOut().then(() => {
        alert("user logout successful")
        window.location.replace("index.html")
    }).catch((error) => {
        console.log(error.message);
    });
}