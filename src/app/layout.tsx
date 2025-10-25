// import type { Metadata } from "next";
// // import { Inter_Tight, DM_Serif_Display } from "next/font/google";
// import { Inter_Tight, Playfair_Display } from "next/font/google";
// import "./globals.css";

// const interTight = Inter_Tight({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const dmSerifDisplay = DM_Serif_Display({
//   subsets: ["latin"],
//   variable: "--font-dm-serif",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Mum's Special Stories",
//   description: "Empowering families of children with special needs",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${interTight.variable} ${dmSerifDisplay.variable}`}>
//         {children}
//       </body>
//     </html>
//   );
// }













import type { Metadata } from "next";
import { Inter_Tight, Playfair_Display } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mum's Special Stories",
  description: "Empowering families of children with special needs across Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${playfairDisplay.variable}`}>
        {children}
      </body>
    </html>
  );
}