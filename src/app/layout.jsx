import {DM_Sans, Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const dmSans = DM_Sans({ subsets: ["latin"] });
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "FishEye - Nos photographes",
};

export default function RootLayout({children}) {
    return (
        <html lang="fr">
        <body
            className={`${dmSans.className} antialiased max-w-360 mx-auto`}
        >
        {children}
        </body>
        </html>
    );
}
