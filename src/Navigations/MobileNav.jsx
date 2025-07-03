import { MdOutlineStorefront } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BsHeart } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import { useContext, useEffect, useState } from "react";
import { Search } from "../modal/Search";
import { CartContext } from "../Contexts/Context";

export const MobileNav = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const { wishlist } = useContext(CartContext);
    const [localUser, setLocalUser] = useState(null);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen1 = () => setSearch(true);
    const handleClose1 = () => setSearch(false);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed?.value && parsed.expiry > Date.now()) {
                    setLocalUser(parsed.value);
                } else {
                    localStorage.removeItem('user');
                }
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Scroll lock effect when search modal is open
    useEffect(() => {
        if (search) {
            const preventScroll = (e) => e.preventDefault();
            const preventKeyScroll = (e) => {
                const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
                if (keys.includes(e.keyCode)) {
                    e.preventDefault();
                    return false;
                }
            };
            window.addEventListener("wheel", preventScroll, { passive: false });
            window.addEventListener("touchmove", preventScroll, { passive: false });
            window.addEventListener("keydown", preventKeyScroll, { passive: false });

            return () => {
                window.removeEventListener("wheel", preventScroll);
                window.removeEventListener("touchmove", preventScroll);
                window.removeEventListener("keydown", preventKeyScroll);
            };
        }
    }, [search]);

    const handleWishlistClick = () => {
        if (localUser) {
            navigate('/wish');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="xl:hidden md:hidden sm:hidden z-10 lg:hidden bottom-0 fixed flex justify-between items-center w-full bg-white shadow px-5 py-4">
            <Link to='/categories'>
                <div className="flex flex-col cursor-pointer group items-center justify-center">
                    <MdOutlineStorefront className="text-4xl font-light text-gray-600" />
                    <li className="list-none text-gray-500 font-semibold text-sm">Store</li>
                </div>
            </Link>

            <div onClick={handleOpen1} className="flex flex-col cursor-pointer group items-center justify-center">
                <IoSearchOutline className="text-4xl font-light text-gray-600" />
                <li className="list-none text-gray-500 font-semibold text-sm">Search</li>
            </div>

            <div onClick={handleWishlistClick} className="relative flex flex-col cursor-pointer group items-center justify-center">
                <BsHeart className="text-3xl font-light text-gray-600" />
                {wishlist?.length > 0 && (
                    <div className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {wishlist.length}
                    </div>
                )}
                <li className="list-none text-gray-500 font-semibold text-sm">Wishlist</li>
            </div>

            <Link to={localUser ? '/profile' : '/login'}>
                <div className="flex flex-col cursor-pointer group items-center justify-center">
                    <IoPersonOutline className="text-3xl font-light text-gray-600" />
                    <li className="list-none text-gray-500 font-semibold text-sm">Profile</li>
                </div>
            </Link>

            <div onClick={handleOpen} className="flex flex-col cursor-pointer group items-center justify-center">
                <IoReorderThreeOutline className="text-3xl font-light text-gray-600" />
                <li className="list-none text-gray-500 font-semibold text-sm">Menu</li>
            </div>

            {open && <Modal open={open} handleClose={handleClose} />}

            {search && (
                <div className="fixed inset-0 z-50 cursor-crosshair" onClick={handleClose1}>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Search onClose={handleClose1} />
                    </div>
                </div>
            )}
        </div>
    );
};
