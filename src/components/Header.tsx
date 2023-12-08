import { Link, Navigate } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownUser from './DropdownUser';
import { User } from '../hooks/userData';
import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../hooks/firebase';

/**
 * interface HeaderProps digunakan untuk mendefinisikan struktur atau bentuk dari properti yang akan diterima
 * oleh komponen Header
 */
interface HeaderProps {
  /**
   * Mendeklarasikan properti sidebarOpen yang memiliki tipe data yang bisa menjadi string, boolean, atau undefined.
   * ini memberikan fleksibilitas dalam hal tipe data yang dapat diterima
   */
  sidebarOpen: string | boolean | undefined

  /**
   * setSidebarOpen adalah fungsi yang akan menerima satu argumen bertipe boolean dan tidak mengembalikan nilai (void). 
   * Ini menandakan bahwa properti ini seharusnya adalah sebuah fungsi yang digunakan untuk mengubah nilai dari 
   * sidebarOpen yang diterima.
   */
  setSidebarOpen: (arg0: boolean) => void

  /**
   * Properti ini mendeklarasikan bahwa properti dataUser akan memiliki tipe data array ([]) yang berisi 
   * objek-objek yang sesuai dengan tipe data atau interface User. Ini menunjukkan bahwa properti ini 
   * harus berisi data pengguna(users) dalam bentuk array.
   */
  dataUser: User[]

  /**
   * Properti ini mendeklarasikan setDataUser adalah sebuah fungsi yang diharapkan menerima satu argumen bertipe array 
   * dari objek-objek yang sesuai dengan tipe data atau interface User, dan tidak mengembalikan nilai (void). 
   * Ini artinya bahwa properti seharusnya adalah sebuah fungsi yang digunakan untuk mengubah nilai dari dataUser yang 
   * diterima.
   */
  setDataUser: (data: User[]) => void
}

const Header: React.FC<HeaderProps> = (props) => {

  /**
   * Membuat state isLoggedOut  untuk mengetahui status login/logout user
   * Sedangkan setIsLoggedOut digunakan untuk mengubah nilai state tersebut
   */
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false)

  /**
   * 
   * Membuat arrorw function logoutUser
   * dimana kita memanggil fungsi signOut dari firebase beserta objek
   * autentikasinya (auth) sebagai parameternya
   * 
   * lalu mengubah nilai state isLoggedOut menjadi true dan membersihkan 
   * key LOGGED_IN yang tersimpan di localStorage
   * 
   * Kemudian melakukan redirect ke halaman login.
   */
  const logoutUser = (e: React.FormEvent) => {
    e.preventDefault()
    signOut(auth).then(() => {
      setIsLoggedOut(true)
      localStorage.clear()
    })
  }

  if (isLoggedOut) {
    return <Navigate to="/auth/login" />
  }

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8.42105C0 3.77023 3.77023 0 8.42105 0H23.5789C28.2298 0 32 3.77023 32 8.42105V23.5789C32 28.2298 28.2298 32 23.5789 32H8.42105C3.77023 32 0 28.2298 0 23.5789V8.42105Z" fill="#3C50E0" />
              <g filter="url(#filter0_d_521_14078)">
                <path d="M8.42139 8.42127C8.42139 7.49111 9.17543 6.73706 10.1056 6.73706V6.73706C11.0358 6.73706 11.7898 7.49111 11.7898 8.42127V23.5792C11.7898 24.5093 11.0358 25.2634 10.1056 25.2634V25.2634C9.17543 25.2634 8.42139 24.5093 8.42139 23.5792V8.42127Z" fill="white" />
              </g>
              <g opacity="0.9" filter="url(#filter1_d_521_14078)">
                <path d="M14.7368 15.1576C14.7368 14.2274 15.4909 13.4734 16.421 13.4734V13.4734C17.3512 13.4734 18.1052 14.2274 18.1052 15.1576V23.5786C18.1052 24.5088 17.3512 25.2629 16.421 25.2629V25.2629C15.4909 25.2629 14.7368 24.5088 14.7368 23.5786V15.1576Z" fill="white" />
              </g>
              <g opacity="0.7" filter="url(#filter2_d_521_14078)">
                <path d="M21.0522 10.9469C21.0522 10.0167 21.8063 9.2627 22.7365 9.2627V9.2627C23.6666 9.2627 24.4207 10.0167 24.4207 10.9469V23.5785C24.4207 24.5086 23.6666 25.2627 22.7365 25.2627V25.2627C21.8063 25.2627 21.0522 24.5086 21.0522 23.5785V10.9469Z" fill="white" />
              </g>
              <defs>
                <filter id="filter0_d_521_14078" x="7.42139" y="6.23706" width="5.36865" height="20.5264" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="0.5" />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_521_14078" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_521_14078" result="shape" />
                </filter>
                <filter id="filter1_d_521_14078" x="13.7368" y="12.9734" width="5.36865" height="13.7896" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="0.5" />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_521_14078" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_521_14078" result="shape" />
                </filter>
                <filter id="filter2_d_521_14078" x="20.0522" y="8.7627" width="5.36865" height="18" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="0.5" />
                  <feGaussianBlur stdDeviation="0.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_521_14078" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_521_14078" result="shape" />
                </filter>
              </defs>
            </svg>

          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute top-1/2 left-0 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}


          </ul>

          {/* <!-- User Area --> */}
          {/* Passing tiga props yaitu dataUser, setDataUser, onClick yang akan digunakan pada komponen DropdownUser */}
          <DropdownUser
            dataUser={props.dataUser}
            setDataUser={props.setDataUser}
            onClick={logoutUser}
          />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;