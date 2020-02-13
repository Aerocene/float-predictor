import { Meteor } from 'meteor/meteor';

export default function emailSignup(email) {
    return new Promise((resolve, reject) => {
        Meteor.call('signup', email, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
