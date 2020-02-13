import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';

const SignupRequests = new Mongo.Collection('SignupRequests');

const HOST = "https://staging.aerocene.org";
// const HOST = "https://app.aerocene.org";
// const HOST = "https://localhost:3000";

export function confirmEmail(id)
{
    const docs = SignupRequests.find(id).fetch();

    docs.forEach(e => {

        if (e.confirmed != true)
        {
            Email.send({ 
                to: "appsignup@aerocene.org", 
                from: Meteor.settings.emails.support, 
                subject: "Aerocene Newsletter Signup", 
                text: `New Signup: ${e.email}`
            });
        }

    });

    // set confirmed
    SignupRequests.update(id, {
        $set: {confirmed: true}
    });


    return docs.length > 0;
}


function validateEmail(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function sendSignupEmail(email, id)
{
    // send email
    Email.send({
        to: email, 
        from: Meteor.settings.emails.support, 
        subject: "Aerocene Newsletter", 
        text: `Thanks for signing up to the Aerocene-Newsletter. Please confirm your signup clicking this link: ${HOST}/signupconfirm/${id}`
    });
}

Meteor.methods({

    signup(useremail) {

        check(useremail, String);

        if (validateEmail(useremail)) {

            // search for user
            const found = SignupRequests.find({
                "email": useremail
            }, {}).fetch();

            if (found.length > 0)
            {
                // update
                found.forEach(element => {
                    
                    if (element.confirmed) {
                        // already confirmed...
                    } else {
                        // send email again
                        sendSignupEmail(useremail, element._id);
                    }
                });
   
            }
            else
            {
                // insert new signup request
                const mongo_id = SignupRequests.insert({
                    email: useremail,
                    confirmed: false
                });

                sendSignupEmail(useremail, mongo_id);                
            }

        }
    },
});