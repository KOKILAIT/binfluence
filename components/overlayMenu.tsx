import React, { useEffect } from "react";
import Link from "next/link";
import { useRef } from "react";
import { useCouncilContext } from "../providers";

interface OverlayMenuProps {
  isOpen: boolean;
  toggler: () => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({ isOpen, toggler }) => {
  // Handling the menu toggle on  the current dom level:
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.stopPropagation();
    toggler();
  };

  // Attach the event listener on the page level to close menu if clicked elsewhere on the page
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handlePageClick = (event: MouseEvent): void => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        toggler();
      }
    };
    document.addEventListener("click", handlePageClick);
    return () => {
      // considering the initial attachment of isOpen is always false, handlePage needs to be
      // re-defined and reattached each time it changes!!!!!
      document.removeEventListener("click", handlePageClick);
    };
  }, [isOpen]);

  // manage menue navigations without home council:
  const homeCouncil = useCouncilContext();

  return (
    <div>
      {isOpen && (
        <div className="">
          {/* overlaying the rest of the screen to better focus users*/}
          <div
            className={`fixed top-[0%] bottom-[0%] left-[0%] right-[0%] creamy-grey-bg ${
              isOpen ? "opacity-60 visible" : "opacity-0 invisible"
            }`}></div>

          {/* navigation menue */}
          <div
            className="fixed top-[0%] bottom-[0%] left-[60%] md:left-[75%] right-[0%] bg-[rgb(var(--light-white))] flex flex-col items-center opacity-100"
            ref={menuRef}>
            <div
              style={{ paddingTop: "20%" }}
              className="flex flex-row items-center mt-3">
              <img src="/images/binfluence-logo-removebg.png" alt="logo" className="w-[10vw] md:w-[7vw] -ml-3" />
              <p className="mt-1 navy-black-text text-[2.5vw] md:text-[1.8vw] font-semibold italic border-t border-r border-b py-1 px-6 header-border-colour">
                Menu
              </p>
            </div>
            <div
              style={{ paddingTop: "10%" }}
              className="flex flex-col font-semibold text-[2.5vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1.5vw] xl:text-[1vw] 2xl:text-[0.8vw]">
              <Link
                href="../"
                className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                onClick={handleMenuItemClick}>
                Home
              </Link>

              {homeCouncil.councilValue && (
                <Link
                  href="../homerecycling"
                  className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                  onClick={handleMenuItemClick}>
                  My Council
                </Link>
              )}

              <Link
                href="../scan"
                className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                onClick={handleMenuItemClick}>
                Scan QR code
              </Link>

              <Link
                href="../explore"
                className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                onClick={handleMenuItemClick}>
                Search other Councils
              </Link>

              {homeCouncil.councilValue && (
                <Link
                  href="../community"
                  className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                  onClick={handleMenuItemClick}>
                  Community schemes
                </Link>
              )}

              <Link
                href="../about"
                className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-300"
                onClick={handleMenuItemClick}>
                About us
              </Link>

              <Link
                href="../contact"
                className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-300"
                onClick={handleMenuItemClick}>
                Contact us
              </Link>

              <Link
                href={homeCouncil.councilValue ? "../terms" : "#"}
                className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                onClick={handleMenuItemClick}>
                Terms of use of app
              </Link>

              <Link
                href={homeCouncil.councilValue ? "../privacy_policy" : "#"}
                className="fading-border active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                onClick={handleMenuItemClick}>
                Privacy policy
              </Link>

              <img src="/images/b-button-black.png" className="w-[4.5vw] md:w-[2.5vw] absolute top-3 right-3 cursor-pointer" onClick={toggler}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverlayMenu;