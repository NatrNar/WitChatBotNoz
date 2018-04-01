const FB = require('./facebook');

var sign_arr = [
    {
        qes: 'Enter Your First Name :',
        ans: null
    },

    {
        qes: 'Enter Your Last Name :',
        ans: null
    },

    {
        qes: 'Enter Your Email :',
        ans: null
    },

    {
        qes: 'Confirm Your Email :',
        ans: null
    },
    {
        qes: 'Enter Your Phone Number :',
        ans: null
    },
    {
        qes: 'Enter Your Zip Code :',
        ans: null
    },
    {
        qes: 'Enter Your Birth date (DD/MM/YYYY) :',
        ans: null
    },
];

function sign_find_indx() {
    for (let i = 0; i < sign_arr.length; i++)
        if (sign_arr[i].ans === null) {
            return i;
        }
}

function sign_proc(sender, msg , sign_arr) {
    let index = sign_find_indx();

    switch (index) {
        case 0 : {
            sign_arr[0].ans = msg;
            FB.fbMessage(sender, sign_arr[1].qes);
            break;
        }
        case 1 : {
            sign_arr[1].ans = msg;
            FB.fbMessage(sender, sign_arr[2].qes);
            break;
        }
        case 2 : {
            sign_arr[2].ans = msg;
            FB.fbMessage(sender, sign_arr[3].qes);
            break;
        }
        case 3 : {

            if (sign_arr[2].ans === msg) {
                sign_arr[3].ans = msg;
                FB.fbMessage(sender, sign_arr[4].qes);
            }
            else {
                sign_arr[2].ans = null;
                FB.fbMessage(sender, 'Email is not match please try again !!');
                FB.fbMessage(sender, sign_arr[2].qes);
            }
            break;
        }

        case 4 : {
            sign_arr[4].ans = msg;
            FB.fbMessage(sender, sign_arr[5].qes);
            break;
        }

        case 5 : {
            sign_arr[5].ans = msg;
            FB.fbMessage(sender, sign_arr[6].qes);
            break;
        }

        case 6 : {
            sign_arr[6].ans = msg;
            FB.fbMessage(sender, 'Your Registration has been done Successfully , please check your Email for Verification');
            break;
        }

    }

    return index === 6 ? true : false;
}

module.exports = {
    Sign_arr: sign_arr,
    Sign_proc: sign_proc
};
