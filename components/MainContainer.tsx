import dynamic from "next/dynamic";
import React, { forwardRef, ReactNode, Ref, useRef } from "react";
import { MainContainerRefProvider } from "../providers";

interface CustomCardProps {
  children: ReactNode;
}
/*const MainContainerRefProvider = dynamic(
  () => import("../providers").then((module) => module.MainContainerRefProvider),
  { ssr: false }
);
*/

const MainContainer: React.FC<CustomCardProps> = ({ children }) => {
  const mainContainerRef = useRef<HTMLDivElement | null>(null); // used to manage the reference of the main body container
  return (
    <div
      ref={mainContainerRef}
      className="p-2 fixed top-[15%] left-[10%] right-[10%] bottom-[14%] sm:left-[17.5%] sm:right-[17.5%] md:left-[25%] md:right-[25%] overflow-y-auto hide-scroll" 
    >
      <MainContainerRefProvider containerRef={mainContainerRef}>
        {children}
      </MainContainerRefProvider>

    </div>
  );

}
export default MainContainer;