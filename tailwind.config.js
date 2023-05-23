module.exports = {
    plugins: [
        require('@tailwindcss/typography'), 
        require("daisyui"),
        require("tailwindcss-animate"),
    ],
    daisyui: {
        themes: ["light", "dark"],
    },
    safelist: [
        'active',
        'alert-info',
        'alert-success',
        'alert-warning',
        'alert-error',
    ]
};
