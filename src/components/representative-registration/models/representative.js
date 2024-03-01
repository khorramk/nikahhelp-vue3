export const validateNumber = (rule, value, callback) => {
    if (!value) {
        callback();
    }
    var regex = /^[0-9]+$/;
    if (!regex.test(value)) {
        callback(
            new Error(
                "Please input 10 digit (only numerals 1-9)."
            )
        );
    } else {
        callback();
    }
}
export const RULES = {

    per_gender: [
        {
            required: true,
            message: "Select your gender",
            trigger: "blur",
        },
    ],
    dob: [
        {
            required: true,
            message: "Select your date of birth",
            trigger: "blur",
        },
    ],
    per_occupation: [
        {
            required: true,
            message: "Select your occupation",
            trigger: "blur",
        },
    ],



};

export const VERIFICATION_RULES = {
    ver_city: [{
        required: true,
        message: "Select city",
        trigger: "blur",
    }],
    ver_country: [{
        required: true,
        message: "Select country",
        trigger: "blur",
    }],
    ver_document_type: [{
        required: true,
        message: "Select document type",
        trigger: "blur",
    }],
    
    ver_recommender_mobile_no:  {
        required: true,
        // message: "Enter your mobile number",
        trigger: "blur",
    },
    
}
export const RULES_PERSONAL = {

    per_current_residence_country: [
        {
            required: true,
            message: "Select a country",
            trigger: "blur",
        },
    ],
    mobile_number: [
        {
            required: true,
            message: "Write your mobile number",
            trigger: "blur",
        },
    ],
    per_permanent_country: [
        {
            required: true,
            message: "Select permanent country",
            trigger: "blur",
        },
    ],

    per_permanent_post_code: [
        {
            required: true,
            message: "Please provide a valid postcode",
            trigger: "blur",
        },
    ],

    address_1: [
        {
            required: true,
            message: "Write address line one",
            trigger: "blur",
        },
    ],
    address_2: [
        {
            required: true,
            message: "Write address line two",
            trigger: "blur",
        },
    ],
    per_permanent_city: [
        {
            required: true,
            message: "Select your city",
            trigger: "blur",
        },
    ],
    per_permanent_address: [
        {
            required: true,
            message: "Enter your home address including country, city and post code",
            trigger: "blur",
        },
    ],
    mobile_number: [

        {
            required: true,
            message: "Enter your mobile number",
            trigger: "blur",
        },


    ],


};

