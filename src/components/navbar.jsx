import Link from "next/link";

export default function Navbar() {
  const pages = ["products","checkout"]

  return (
    <nav className="sticky top-0 z-50 bg-white text-black shadow-md shadow-neutral-300 dark:bg-[#0a0a0a] dark:shadow-neutral-600 dark:text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href={"/"} className="hover:text-blue-600">
          E-shop
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href={"/"} className="hover:text-blue-600">
            Home
          </Link>
          {pages.map((page, index) => (
            <Link key={index} href={`/${page}`} className="hover:text-blue-600">
              {page.charAt(0).toUpperCase() + page.slice(1, page.length)}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4"></div>
        </div>
    </nav>
  );
}