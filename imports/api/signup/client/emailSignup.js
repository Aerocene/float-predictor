import { Meteor } from 'meteor/meteor';

export default function emailSignup(name, email) {
    return new Promise((resolve, reject) => {
        Meteor.call('signup', name, email, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
