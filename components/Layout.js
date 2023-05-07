import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Rakii Pizzas' : 'Rakii Pizzas'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav class="bg-[#ffc823] h-20 px-2 sm:px-4 py-2.5 dark:bg-gray-900  w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
              <Link href="/">
                <Image src="/img/logo.png" alt="" width="160" height="160" />
              </Link>
              <div class="flex md:order-2">
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="flex flex-row justify-center text-white bg-[#000000] px-3 py-3 rounded-md">
                      {session.user.name}
                      <Image
                        className="justify-between"
                        src="/images/arrow.png"
                        alt=""
                        width="20"
                        height="20"
                      />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/search">
                          Buy Pizza
                        </DropdownLink>
                      </Menu.Item>

                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/cart">
                          Cart Page
                          {cartItemsCount > 0 && (
                            <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                              {cartItemsCount}
                            </span>
                          )}
                        </DropdownLink>
                      </Menu.Item>

                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>

                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Admin Dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <h3
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </h3>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <h3 className="text-white bg-[#000000] px-3 py-3 rounded-md">
                      Login
                    </h3>
                  </Link>
                )}
              </div>
              <div
                class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
              >
                <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-[#ffc823] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/search">Pizza</Link>
                  </li>
                  <li>
                    <Link href="/cart">
                      Cart
                      {cartItemsCount > 0 && (
                        <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                          {cartItemsCount}
                        </span>
                      )}
                    </Link>
                  </li>

                  <li>
                    <Link href="/">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-2 px-2">{children}</main>
        <footer className="bg-[#ffc823] flex h-10 justify-center items-center shadow-inner">
          <p className="font-bold">Copyright © 2022 Rakii Pizza</p>
        </footer>
      </div>
    </>
  );
}
