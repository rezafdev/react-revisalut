/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ], theme: {
        extend: {
            colors: {
                "Color1": "#295F6D",
                "Color2": "#9FA6B2",
                "Color3": "#01505F",
                "Color4": "#344054",
                "Color5": "#EBF1FD",
                "Color6": "#667085",
                "Color7": "#EBEBEB",
                "Color8": "#DCDFE3",
                "Color9": "#F5F7F9",
                "Color10": "#6F6F6F",
                "Color11": "#1C1C1C",
                "Color12": "#6E7C87",
                "Color13": "#DDE2E4",
                "Grey-Light": "#f5f5f5"
            }
        },
        screens: {
            'maxlg': {'max': '1250px'},
            'min-sm': {'min': '640px'},
            'sm': {'max': '640px'},
            'md': {'max': '768px'},
            'min-md': {'min': '769px'},
            'max830': {'max': '830px'},
            'lg': {'max': '1000px'},
            'min-lg': {'min': '1000px'},
            'xl': {'max': '1281px'},
            'min-xl': {'min': '1281px'},
            '2xl': {'max': '1450px'},
            'min2xl': {'min': '1450px'},
            '3xl': {'max': '1920px'},
            'min3xl': {'min': '1920px'},
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

