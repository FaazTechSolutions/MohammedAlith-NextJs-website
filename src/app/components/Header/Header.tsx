import Link from "next/link";
import Login from "./Login";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
export default function Header(){
  return(
  <div className="flex justify-between bg-[#54585b]  md:px-18 py-5 flex-shrink-1 w-screen">
    <div className="flex gap-5 text-white pt-1 ">
      <Link href='https://x.com/MawaridManpower' target="_blank">
      <img src="https://mawarid.com.sa/assets/images/twittericon.png"
      alt="twitter"
      width={12} className="pt-1"  />
      </Link>

      <Link href='https://www.linkedin.com/company/mawarid-manpower-solutions-company-riyadh-saudi-arabia/' target="_blank">
      <FaLinkedinIn 
     width={12}/>
     
       
    
      </Link>

      <Link href=''>
      <AiFillYoutube 
      width={12}/>
      </Link>
    </div>
    <div>
      <Login/>
    </div>
  </div>
  )
}