"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  isActive: boolean;
}

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const WalletConnector = () => {
  return (
    <button
      className="px-4 py-2 bg-teal-400 text-white rounded  hover:bg-teal-300 transition  duration-150"
      onClick={() => console.log("connect wallet")}
    >
      Connect Wallet
    </button>
  );
};

const NavTab = ({ href, children, isActive }: NavLinkProps) => {
  const activeclasses = isActive
    ? "bg-teal-600 text-white font-semibold"
    : "text-gray-800 hover:bg-gray-700 hover:text-white";
  return (
    <Link href={href} className={`px-3 py-2 rounded-md text-sm ${activeclasses}`}>
      {children}
    </Link>
  );
};

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const rendeNavLinks = () => (
    <>
      <NavTab href="/" isActive={pathname === "/"}>
        Home
      </NavTab>
      <NavTab href="/Dashboard" isActive={pathname === "/Dashboard"}>
        Dashboard
      </NavTab>
      <NavTab href="/CreateCampaign" isActive={pathname === "/CreateCampaign"}>
        Create Campaign
      </NavTab>
      <NavTab href="/MyCampaigns" isActive={pathname === "/MyCampaigns"}>
        My Campaigns
      </NavTab>
      <NavTab href="/Profile" isActive={pathname === "/Profile"}>
        Profile
      </NavTab>
    </>
  );

  return (
    <div className="bg-white  sticky top-0  z-10 shadow-lg">
      <div className="flex justify-between  item-center  p-4">
        <div>
          <Link href="/" className="font-black text-teal-400 text-3xl">
            RaiseChain
          </Link>
        </div>
        <div className="hidden md:flex  space-x-2 items-center">{rendeNavLinks()}</div>
        <div className="hidden md:block">
          <WalletConnector />
        </div>
        <div className="md:hidden  flex  items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-800 hover:text-teal-500 transition duration-150"
          >
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4  space-y-2 flex flex-col">
          <div className="flex flex-col space-y-2">{rendeNavLinks()}</div>
          <div className="pt-4 w-full">
            <WalletConnector />
          </div>
        </div>
      )}
    </div>
  );
}
