export class User {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    usertype: string;
    email_id: string;
    mobile_no: number;
    dob: string;
    location: string;
    designation: string;
    department: string;
};

export const user_role = [{value: 'Employee'}, {value: 'Manager'}];
export const dept = [{value: 'Software'}, {value: 'Support'}];
export const desig = [{value: 'Engineer'}, {value: 'Manager'}];

