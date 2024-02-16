import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Header = () => {
    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 shadow-sm">
                <div className="flex flex-wrap justify-between items-center mx-auto ">
                    <a href="https://flowbite.com" className="flex items-center gap-x-2 lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="39"
                            height="39"
                            viewBox="0 0 39 39"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_5539_607)">
                                <path
                                    d="M24.1964 27.7532C23.9751 27.7489 23.7555 27.7437 23.5351 27.7359C23.3579 27.7299 23.1599 27.4636 23.0225 27.2804C22.0249 25.9525 21.0222 24.6282 20.06 23.2744C19.8815 22.9804 19.6234 22.743 19.3157 22.5894C19.0079 22.4358 18.663 22.3724 18.3208 22.4065C17.8013 22.4281 17.2818 22.4384 16.7605 22.4428V27.7014H13.1445V19.354H14.7022C15.6946 19.354 16.6861 19.3566 17.6776 19.3566L24.1964 27.7532Z"
                                    fill="black"
                                />
                                <path
                                    d="M25.7509 27.7612C25.5054 27.7621 25.2642 27.7621 25.0257 27.7612L18.5 19.3568C18.7412 19.3577 18.9824 19.3568 19.2244 19.356L25.7509 27.7612Z"
                                    fill="black"
                                />
                                <path
                                    d="M12.9629 13.2847L16.444 17.7678C16.2426 17.7644 16.042 17.7609 15.8415 17.7557C15.6395 17.7055 15.4645 17.58 15.3522 17.4047C14.5932 16.4002 13.8247 15.4009 13.128 14.354C12.9456 14.0808 12.9767 13.6477 12.9629 13.2847Z"
                                    fill="black"
                                />
                                <path
                                    d="M17.996 17.7745C17.7505 17.7745 17.5094 17.7745 17.2708 17.7737L12.9512 12.2108C12.9529 11.9151 12.9564 11.6091 12.9564 11.2832L17.996 17.7745Z"
                                    fill="black"
                                />
                                <path
                                    d="M27.2781 27.7569C27.0361 27.7569 26.8001 27.7577 26.5684 27.7586L20.0419 19.3525C20.1957 19.3525 20.3487 19.3516 20.5026 19.3508C22.2168 19.3386 23.1919 18.4897 23.2662 16.9795C23.338 15.5289 22.4433 14.4933 20.8181 14.3576C19.5707 14.2538 18.3069 14.3368 16.8443 14.3368C17.7641 15.4848 18.6138 16.5447 19.5967 17.7714C19.3296 17.7714 19.0691 17.7719 18.8152 17.7731L13.7617 11.2645H13.9813C16.3438 11.274 18.7124 11.1789 21.068 11.3163C22.0123 11.3574 22.9306 11.6383 23.7364 12.1324C24.5422 12.6265 25.209 13.3176 25.6739 14.1407C26.1388 14.9637 26.3865 15.8915 26.3937 16.8367C26.401 17.782 26.1674 18.7135 25.7152 19.5435C25.0772 20.7244 24.0719 21.4947 22.7882 22.0367C24.2681 23.9212 25.704 25.7513 27.2781 27.7569Z"
                                    fill="black"
                                />
                                <path
                                    d="M38.6047 15.5726C37.9654 12.4752 36.5836 9.57927 34.578 7.13376C32.5725 4.68825 30.0032 2.76627 27.0909 1.53298C25.9108 1.03334 24.6839 0.652369 23.4284 0.395705C20.8369 -0.131902 18.1656 -0.131902 15.574 0.395705C13.078 0.906726 10.707 1.90425 8.59628 3.33136C5.46243 5.44708 3.00954 8.42645 1.53492 11.9083C1.03531 13.089 0.654344 14.3165 0.397652 15.5726C-0.182047 18.4062 -0.124165 21.3333 0.567103 24.1418C1.25837 26.9503 2.56571 29.5699 4.3944 31.8106C6.22309 34.0514 8.52733 35.8573 11.1402 37.0975C13.753 38.3377 16.609 38.9811 19.5012 38.9811C22.3934 38.9811 25.2494 38.3377 27.8622 37.0975C30.475 35.8573 32.7793 34.0514 34.6079 31.8106C36.4366 29.5699 37.744 26.9503 38.4352 24.1418C39.1265 21.3333 39.1844 18.4062 38.6047 15.5726H38.6047ZM19.5004 36.3281C16.1721 36.3281 12.9185 35.3411 10.1511 33.4919C7.38373 31.6427 5.22681 29.0144 3.95312 25.9393C2.67943 22.8642 2.34618 19.4805 2.9955 16.216C3.64483 12.9515 5.24757 9.95286 7.60106 7.59929C9.95454 5.24572 12.9531 3.64292 16.2174 2.99358C19.4818 2.34423 22.8654 2.67751 25.9404 3.95125C29.0153 5.225 31.6436 7.38201 33.4927 10.1495C35.3418 12.917 36.3287 16.1707 36.3287 19.4992C36.3287 21.7092 35.8935 23.8976 35.0478 25.9394C34.2021 27.9811 32.9625 29.8364 31.3998 31.3991C29.8372 32.9618 27.982 34.2014 25.9403 35.0471C23.8986 35.8929 21.7104 36.3281 19.5004 36.3281Z"
                                    fill="black"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_5539_607">
                                    <rect width="39" height="39" fill="black" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="self-center text-xl font-semibold whitespace-nowrap ">Ridenear</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <a href="#" className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 d focus:outline-none ">Log in</a>
                        <button type="button" className="text-gray-700 shadow-md hover:bg-gray-200 hover:text-white focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm p-2.5 text-center inline-flex items-center">
                            <Icon icon="iconamoon:notification" />
                        </button>
                        <button type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" >

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header