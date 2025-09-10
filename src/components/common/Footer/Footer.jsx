import React from 'react'
import studyNotion from "../../../assets/studyNotion.png"
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Links from './Links';
import { Link } from "react-router-dom";

import {
  Company,
  Resources,
  Plans,
  Community,
  Subjects,
  CareerBuilding,
  Support,
  Languages,
} from "../../../data/footerData";


const Footer = () => {
  return (
    <div className="bg-slate-900 text-gray-500 w-full p-8 ">
      <div className="flex flex-wrap justify-between border-b-1 py-4 gap-4">
        <div className="flex flex-wrap lg:w-[45%] justify-between lg:justify-evenly gap-4 ">
          <div className="flex flex-col gap-4">
            <img src={studyNotion} alt="studyNotion" />
            <div className="">
              <Links heading={"Company"} items={Company} />
            </div>
            <div className="flex flex-row gap-4 text-2xl mt-4 text-gray-400">
              <FaFacebook className="hover:text-white cursor-pointer transition-all duration-300" />
              <FaGoogle className="hover:text-white cursor-pointer transition-all duration-300" />
              <FaTwitter className="hover:text-white cursor-pointer transition-all duration-300" />
              <FaYoutube className="hover:text-white cursor-pointer transition-all duration-300" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Links heading={"Resources"} items={Resources} />
            </div>
            <div>
              <Links heading={"Support"} items={Support} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Links heading={"Plans"} items={Plans} />
            </div>
            <div>
              <Links heading={"Community"} items={Community} />
            </div>
          </div>
        </div>

        <div className="border-1"></div>

        <div className="flex flex-wrap lg:w-[45%] justify-between lg:justify-evenly gap-4">
          <div>
            <Links heading={"Subjects"} items={Subjects} />
          </div>
          <div>
            <Links heading={"Languages"} items={Languages} />
          </div>
          <div>
            <Links heading={"Career Building"} items={CareerBuilding} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:w-[100%] justify-between p-2 lg:8 gap-2">
        <div className="flex">
          <div className="border-r-1 px-2">
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
          </div>
          <div className="border-r-1 px-2">
            <Link to={"/cookie-policy"}>Cookie Policy</Link>
          </div>
          <div className="px-2">
            <Link to={"/terms"}>Terms</Link>
          </div>
        </div>
        <div className="">
          <p>Made with ❤️ CodeHelp © 2023 Studynotion</p>
        </div>
      </div>
    </div>
  );
}

export default Footer
