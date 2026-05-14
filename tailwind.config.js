/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./index.html"],
    theme: {
        extend: {
            colors: {
                "inverse-surface": "#e2e2e2",
                "on-surface": "#e2e2e2",
                "on-tertiary-fixed": "#1a1c1c",
                "on-background": "#e2e2e2",
                "outline-variant": "#444748",
                "surface-container-lowest": "#0e0e0e",
                "surface-tint": "#c6c6c7",
                "on-primary-fixed-variant": "#454747",
                "tertiary-fixed": "#e2e2e2",
                "secondary-fixed-dim": "#b3c6f3",
                "on-primary-fixed": "#1a1c1c",
                "primary-fixed": "#e2e2e2",
                "on-error": "#690005",
                "background": "#131313",
                "surface-dim": "#131313",
                "on-primary": "#2f3131",
                "on-primary-container": "#636565",
                "surface-variant": "#353535",
                "on-tertiary": "#2f3131",
                "inverse-on-surface": "#303030",
                "on-tertiary-container": "#636565",
                secondary: "#b3c6f3",
                "inverse-primary": "#5d5f5f",
                "surface-bright": "#393939",
                "secondary-fixed": "#d8e2ff",
                "on-secondary-fixed-variant": "#33466c",
                "surface-container-highest": "#353535",
                "secondary-container": "#33466c",
                "surface-container-high": "#2a2a2a",
                "on-secondary-fixed": "#031a3e",
                "on-error-container": "#ffdad6",
                "error-container": "#93000a",
                "on-surface-variant": "#c4c7c8",
                "on-secondary-container": "#a2b5e1",
                "primary-container": "#e2e2e2",
                primary: "#ffffff",
                surface: "#131313",
                "tertiary-fixed-dim": "#c6c6c7",
                "primary-fixed-dim": "#c6c6c7",
                "surface-container": "#1f1f1f",
                "on-tertiary-fixed-variant": "#454747",
                "tertiary-container": "#e2e2e2",
                "on-secondary": "#1c3054",
                tertiary: "#ffffff",
                "surface-container-low": "#1b1b1b",
                error: "#ffb4ab",
                outline: "#8e9192"
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px"
            },
            spacing: {
                gutter: "24px",
                "grid-columns": "12",
                unit: "4px",
                "margin-mobile": "20px",
                "margin-desktop": "64px"
            },
            fontFamily: {
                "display-lg-mobile": ["Hanken Grotesk"],
                "display-lg": ["Hanken Grotesk"],
                "body-md": ["Hanken Grotesk"],
                "body-lg": ["Hanken Grotesk"],
                "label-sm": ["Geist"],
                "headline-md": ["Hanken Grotesk"],
                "label-mono": ["Geist"]
            },
            fontSize: {
                "display-lg-mobile": ["48px", { lineHeight: "52px", letterSpacing: "-0.03em", fontWeight: "600" }],
                "display-lg": ["72px", { lineHeight: "80px", letterSpacing: "-0.04em", fontWeight: "600" }],
                "body-md": ["16px", { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" }],
                "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "0em", fontWeight: "400" }],
                "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.1em", fontWeight: "500" }],
                "headline-md": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "500" }],
                "label-mono": ["13px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "400" }]
            }
        }
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/container-queries")
    ]
};
