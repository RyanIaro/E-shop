"use client"; 

import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCartStore } from "../../store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const { items } = useCartStore();

  const pages = ["products","checkout"]
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const isActive = (path) => pathname === path;
  const isDetailsPage = (path) => pathname.startsWith(path);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth >= 768) {
        setIsMenuOpen(false);
      };
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white text-black shadow-md shadow-neutral-300 dark:bg-[#0a0a0a] dark:shadow-neutral-600 dark:text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"} className="hover:text-blue-600">
          E-shop
        </Link>
        <div className="hidden md:flex">
          <Link
          href={"/"}
          className={`hover:text-blue-600 p-4 ${isActive("/") ? "bg-neutral-100 border-b-2 border-b-blue-400" : ""}`}
          >
            Home
          </Link>
          {pages.map((page, index) => {
            const href = `/${page}`;
            return(
              <Link
              key={index}
              href={href}
              className={`hover:text-blue-600 p-4 ${isActive(`${href}`) || isDetailsPage(`${href}/`) ? "bg-neutral-100 border-b-2 border-b-blue-400" : ""}`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center space-x-4">
          <Link
          href={"/checkout"}
           className="relative"
          >
            <ShoppingCartIcon className="h-6 w-6"/>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full text-xs text-white bg-red-500">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          >
            {isMenuOpen
            ? <XMarkIcon className="h-6 w-6"/>
            : <Bars3Icon className="h-6 w-6"/>
            }
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link
              href="/"
              className= "block hover:text-blue-600"
              >
                Home
              </Link>
            </li>
            {pages.map((page, index) => (
              <li key={index}>
                <Link href={`/${page}`} className= "block hover:text-blue-600">
                  {page.charAt(0).toUpperCase() + page.slice(1, page.length)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </nav>
  );
}