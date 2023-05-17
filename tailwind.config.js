module.exports = {
    plugins: [
        require('@tailwindcss/typography'), 
        require("daisyui"),
        require("tailwindcss-animate"),
    ],
    daisyui: {
        themes: ["retro", "coffee"],
    },
    safelist: [
        'active',
        'alert-info',
        'alert-success',
        'alert-warning',
        'alert-error',
    ]
};
