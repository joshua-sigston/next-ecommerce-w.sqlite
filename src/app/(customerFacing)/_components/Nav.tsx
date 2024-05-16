'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { linkSlide, menuSlide } from '@/framer/variants';
import { AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', name: 'HOME' },
  { href: '/products', name: 'PRODUCTS' },
  { href: '/cart', name: 'CART' },
];

export default function Nav() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
    // console.log('menu toggled');
  };

  return (
    <>
      <Hamburger toggleMenu={toggleMenu} menu={menu} />
      <AnimatePresence mode="wait">
        {menu && (
          <motion.nav
            variants={menuSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-30 top-0 left-0 w-full h-screen flex flex-col items-center justify-center gap-y-5 bg-rose-500 md:items-start"
          >
            {links.map((link, index) => (
              <div className="overflow-hidden" key={index}>
                <motion.div
                  custom={index}
                  variants={linkSlide}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-4xl md:text-6xl md:ml-20"
                >
                  <Link href={link.href} onClick={toggleMenu}>
                    {link.name}
                  </Link>
                </motion.div>
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

interface hamburgerProps {
  toggleMenu: () => void;
  menu: boolean;
}

function Hamburger({ toggleMenu, menu }: hamburgerProps) {
  return (
    <div
      className="fixed z-40 top-5 right-4 flex flex-col gap-y-3 rounded-md lg:right-28"
      onClick={toggleMenu}
    >
      <div className="w-[50px] h-[4px] bg-gray-700"></div>
      <div
        className={`w-[10px] h-[10px] bg-teal-500 absolute ${
          menu ? 'translate-x-10 bg-rose-900' : 'translate-x-0'
        } transition ease-in-out duration-500`}
      ></div>
      <div className="w-[50px] h-[4px] bg-gray-700"></div>
      <div
        className={`w-[10px] h-[10px] bottom-0 right-0 bg-teal-500 absolute ${
          menu ? 'translate-x-[-400%] bg-rose-900' : 'translate-x-0'
        } transition ease-in-out duration-500`}
      ></div>
    </div>
  );
}
