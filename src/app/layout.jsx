import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "FishEye - Nos photographes",
};

export default function RootLayout({children}) {
    return (
        <html lang="fr">
        <body className={`${dmSans.className} antialiased max-w-360 mx-auto`}>
        {children}
        </body>
        </html>
    );
}
