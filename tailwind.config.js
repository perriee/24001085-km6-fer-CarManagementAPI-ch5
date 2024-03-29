/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.html", "./node_modules/flowbite/**/*.js"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#922F93",
                    hover: "#79197D",
                },
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
