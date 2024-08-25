import React from "react";
import Link from "next/link";
import Head from "next/head";

const NavItem: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="text-space-white hover:text-space-pink transition-colors"
  >
    {children}
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Your Name - Portfolio</title>
        <meta name="description" content="Your portfolio description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-space-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="font-display text-xl text-space-white">
                Your Name
              </Link>
            </div>
            <div className="flex space-x-4">
              <NavItem href="/#about">About</NavItem>
              <NavItem href="/#projects">Projects</NavItem>
              <NavItem href="/#skills">Skills</NavItem>
              <NavItem href="/#contact">Contact</NavItem>
              <NavItem href="/chat">Chat</NavItem>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-space-blue py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
