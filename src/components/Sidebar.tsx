import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <svg width="176" height="32" viewBox="0 0 176 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 9.17592H50.2773V27.1572H54.032V9.17592H60.3093V5.71459H44V9.17592Z" fill="white" />
            <path d="M64.4999 27.5386C66.7585 27.5386 68.7239 26.5119 69.3399 25.0159L69.6039 27.1572H72.7425V18.3572C72.7425 14.3386 70.3372 12.2266 66.4359 12.2266C62.5052 12.2266 59.9239 14.2799 59.9239 17.4186H62.9745C62.9745 15.8933 64.1479 15.0133 66.2599 15.0133C68.0785 15.0133 69.2519 15.8053 69.2519 17.7706V18.0932L64.9105 18.4159C61.4785 18.6799 59.5425 20.3519 59.5425 23.0213C59.5425 25.7492 61.4199 27.5386 64.4999 27.5386ZM65.6732 24.8399C64.0599 24.8399 63.1799 24.1946 63.1799 22.8746C63.1799 21.7012 64.0305 20.9679 66.2599 20.7626L69.2812 20.5279V21.2906C69.2812 23.5199 67.8732 24.8399 65.6732 24.8399Z" fill="white" />
            <path d="M78.0475 9.76258C79.2209 9.76258 80.1889 8.79458 80.1889 7.59192C80.1889 6.38925 79.2209 5.45059 78.0475 5.45059C76.8155 5.45059 75.8475 6.38925 75.8475 7.59192C75.8475 8.79458 76.8155 9.76258 78.0475 9.76258ZM76.2582 27.1572H79.8369V12.6666H76.2582V27.1572Z" fill="white" />
            <path d="M87.1422 27.1572V5.33325H83.5929V27.1572H87.1422Z" fill="white" />
            <path d="M93.2722 27.1572L95.0029 22.1999H103.011L104.742 27.1572H108.702L100.958 5.71459H97.1149L89.3709 27.1572H93.2722ZM98.5522 12.1093C98.7576 11.5226 98.9335 10.8773 99.0215 10.4666C99.0802 10.9066 99.2855 11.5519 99.4615 12.1093L101.926 19.0319H96.1175L98.5522 12.1093Z" fill="white" />
            <path d="M116.158 27.5386C118.358 27.5386 120.236 26.5706 121.116 24.8986L121.35 27.1572H124.636V5.33325H121.086V14.5146C120.177 13.0773 118.388 12.2266 116.364 12.2266C111.993 12.2266 109.353 15.4533 109.353 19.9706C109.353 24.4586 111.964 27.5386 116.158 27.5386ZM116.95 24.2532C114.457 24.2532 112.932 22.4346 112.932 19.8533C112.932 17.2719 114.457 15.4239 116.95 15.4239C119.444 15.4239 121.057 17.2426 121.057 19.8533C121.057 22.4639 119.444 24.2532 116.95 24.2532Z" fill="white" />
            <path d="M131.944 27.1572V18.9439C131.944 16.5973 133.322 15.4826 135.024 15.4826C136.725 15.4826 137.81 16.5679 137.81 18.5919V27.1572H141.389V18.9439C141.389 16.5679 142.709 15.4533 144.44 15.4533C146.141 15.4533 147.256 16.5386 147.256 18.6213V27.1572H150.805V17.6826C150.805 14.3386 148.869 12.2266 145.349 12.2266C143.149 12.2266 141.448 13.3119 140.714 14.9839C139.952 13.3119 138.426 12.2266 136.226 12.2266C134.144 12.2266 132.677 13.1653 131.944 14.3679L131.65 12.6666H128.365V27.1572H131.944Z" fill="white" />
            <path d="M156.107 9.76258C157.281 9.76258 158.249 8.79458 158.249 7.59192C158.249 6.38925 157.281 5.45059 156.107 5.45059C154.875 5.45059 153.907 6.38925 153.907 7.59192C153.907 8.79458 154.875 9.76258 156.107 9.76258ZM154.318 27.1572H157.897V12.6666H154.318V27.1572Z" fill="white" />
            <path d="M165.173 27.1572V19.3546C165.173 17.0079 166.522 15.4826 168.722 15.4826C170.57 15.4826 171.773 16.6559 171.773 19.0906V27.1572H175.351V18.2399C175.351 14.4853 173.474 12.2266 169.837 12.2266C167.871 12.2266 166.111 13.0773 165.202 14.5439L164.909 12.6666H161.594V27.1572H165.173Z" fill="white" />
            <path d="M0 8.42105C0 3.77023 3.77023 0 8.42105 0H23.5789C28.2298 0 32 3.77023 32 8.42105V23.5789C32 28.2298 28.2298 32 23.5789 32H8.42105C3.77023 32 0 28.2298 0 23.5789V8.42105Z" fill="#3C50E0" />
            <g filter="url(#filter0_d_506_10589)">
              <path d="M8.42139 8.42127C8.42139 7.49111 9.17543 6.73706 10.1056 6.73706V6.73706C11.0358 6.73706 11.7898 7.49111 11.7898 8.42127V23.5792C11.7898 24.5093 11.0358 25.2634 10.1056 25.2634V25.2634C9.17543 25.2634 8.42139 24.5093 8.42139 23.5792V8.42127Z" fill="white" />
            </g>
            <g opacity="0.9" filter="url(#filter1_d_506_10589)">
              <path d="M14.7368 15.1576C14.7368 14.2274 15.4909 13.4734 16.421 13.4734V13.4734C17.3512 13.4734 18.1052 14.2274 18.1052 15.1576V23.5786C18.1052 24.5088 17.3512 25.2629 16.421 25.2629V25.2629C15.4909 25.2629 14.7368 24.5088 14.7368 23.5786V15.1576Z" fill="white" />
            </g>
            <g opacity="0.7" filter="url(#filter2_d_506_10589)">
              <path d="M21.0522 10.9469C21.0522 10.0167 21.8063 9.2627 22.7365 9.2627V9.2627C23.6666 9.2627 24.4207 10.0167 24.4207 10.9469V23.5785C24.4207 24.5086 23.6666 25.2627 22.7365 25.2627V25.2627C21.8063 25.2627 21.0522 24.5086 21.0522 23.5785V10.9469Z" fill="white" />
            </g>
            <defs>
              <filter id="filter0_d_506_10589" x="7.42139" y="6.23706" width="5.36865" height="20.5264" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="0.5" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_506_10589" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_506_10589" result="shape" />
              </filter>
              <filter id="filter1_d_506_10589" x="13.7368" y="12.9734" width="5.36865" height="13.7896" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="0.5" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_506_10589" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_506_10589" result="shape" />
              </filter>
              <filter id="filter2_d_506_10589" x="20.0522" y="8.7627" width="5.36865" height="18" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="0.5" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_506_10589" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_506_10589" result="shape" />
              </filter>
            </defs>
          </svg>

        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                            pathname.includes('dashboard')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                            fill=""
                          />
                        </svg>
                        Dashboard
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              eCommerce
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
