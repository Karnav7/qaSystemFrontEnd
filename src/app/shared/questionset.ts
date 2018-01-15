export class QuestionSet {
    _id: string;
    name: string;
    department: string;
    designation: string;
    location: string;
    test_duration: number;
    questions: Question[];
}

export class Question {
    _id: string;
    name: string;
    marks: number;
    answered: boolean;
    options: Option[];
}

export class Option {
    _id: string;
    name: string;
    isSelected: boolean;
    isAnswer: boolean;
}

export const dept = [{value: 'Software'}, {value: 'Support'}];
export const desig = [{value: 'Engineer'}, {value: 'Manager'}];
export const loc = [{value: 'Mumbai'}, {value: 'Pune'}, {value: 'Delhi'}, {value: 'Chennai'}];
export const isanswer = [{value: 'true'}, {value: 'false'}];
