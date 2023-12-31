import { Inter } from "next/font/google";
import { SideBar } from "../components/SideBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export const revalidate = 300;

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SideBar />
				{children}
			</body>
		</html>
	);
}
