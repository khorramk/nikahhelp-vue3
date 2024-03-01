export const createReligionTV = (countries = ['']) => {
    return countries.map(c => ({
        text: c,
        value: c
    }));
};


export const ReligionTV = createReligionTV([
    "Christianity",
    "Islam",
    "Irreligion",
    "Hinduism",
    "Buddhism",
    "Folk religions",
    "Sikhism",
    "Judaism",
]);