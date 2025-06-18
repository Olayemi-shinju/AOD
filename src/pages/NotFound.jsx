import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
    return (
        <div className=" py-24 flex items-center justify-center">
            <div className="text-center">
                 <h1 className="uppercase text-blue-600 font-bold text-[150px]">
                   404
                </h1>
                <h1 className="uppercase text-blue-600 font-bold text-6xl">
                    page not found
                </h1>
                <Link to='/'>
                    <button className="p-4 wish cursor-pointer bg-blue-600 text-white mt-6 w-[250px] rounded">Go Back</button>
                </Link>
            </div>
        </div>
    );
}
