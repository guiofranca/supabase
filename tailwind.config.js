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
        'border-info',
        'border-success',
        'border-warning',
        'border-error',
    ]
};
