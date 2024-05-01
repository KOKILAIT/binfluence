"use client";
import React, { useEffect, useState } from "react";
import { useCouncilContext } from "../providers";
import OverlayMenu from "./overlayMenu";
import { usePathname } from "next/navigation";

function Header(): React.JSX.Element {
  // Constant extract the councilContext:
  const homeCouncil = useCouncilContext();

  // Setting up state management tools for the menu
  const [isOpen, setIsOpen] = useState(false);

  // simple toggles for the menu button
  const handleToggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // In the future, please set up how the
  const [councilLogo, setCouncilLogo] = useState<string | null>(null); // to control the path of whether to display council logo or not:
  const [isloadingLogo, setIsloadingLogo] = useState(true);
  useEffect(() => {
    const publicPath = "/images/councils/";
    if (homeCouncil.councilValue == null) {
      setCouncilLogo(null); // for now display the demo council logo all the time
    } else {
      fetch(
        `/api/validation/validateCouncilLogo?council=${homeCouncil.councilValue
          .split(",")[0]
          .trim()}`
      ) //we use this to fetch whether the council is onboard
        .then((res) => res.json())
        .then((isOnboard) => {
          if (isOnboard["isLiscencing"] && homeCouncil.councilValue) {
            const logoName = homeCouncil.councilValue
              .split(",")[0]
              .trim()
              .replaceAll(" ", "-"); // logo image names to be in forms of xx-xxx-xx
            setCouncilLogo(publicPath.concat(logoName).concat(".png"));
          } else {
            setCouncilLogo(
              publicPath.concat("demo-council-logo").concat(".png")
            ); // later can setting null if they are not onboard
          }
        })
        .catch((error) => {
          setCouncilLogo(null);
          console.log(error);
        });
      setIsloadingLogo(false);
    }
  }, [homeCouncil.councilValue]);

  // Section for pathName:
  const currentPath = usePathname()

  return (
      <div className={`sticky top-0 h-[15vh] z-50 flex flex-row items-center w-[100vw]`}>
        <img
          src="/images/binfluence-logo-removebg.png"
          alt="logo"
          className="-ml-2 w-[28vw] max-w-[150px]"
        />

        {!currentPath.includes("/explore") && (
          // normal display of home council
          <p style={{ whiteSpace: "nowrap" }} className="navy-black-text text-[3.2vw] sm:text-[22px] mt-2 -ml-3 border-t border-r border-b py-1 pl-1 pr-2 header-border-colour">
            {(homeCouncil.councilValue && !isloadingLogo)? (
              <span>My Council is <span className="font-semibold">{homeCouncil.councilValue.split(",")[0].trim()}</span></span>
            ) : (
              "Please select your Council"
            )}
          </p>
        )}

        
        {/**(councilLogo && !currentPath.includes("/explore")) && ( // <== used to show council logos
          <img src={councilLogo} className="ml-1 mr-1 h-[50%]"/>
            )**/}
      
        {/* Setting up Menu Icon on the right corner*/}
        <button
          onClick={handleToggleMenu}
          className={`navy-black-text focus:outline-none absolute right-[2%] w-[7.2vw] sm:[5vw] md:w-[5vw] lg:w-[4vw] xl:w-[3.5vw]`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#383e48"
            className="h-full">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
        <OverlayMenu isOpen={isOpen} toggler={handleToggleMenu} />
      </div>
  );
}
export default Header;