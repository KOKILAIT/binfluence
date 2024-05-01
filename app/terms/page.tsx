import React from "react";
import { ReactNode } from "react";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

// Component is used to display card like information (i..e, texts etc.)
const Terms: React.FC = () => {
  return (
    <Card>
        <div className="flex flex-col">
        <h1 className="text-[5vw] sm:text-[3.2vw] md:text-[2.8vw] lg:text-[2.2vw] xl:text-[1.7vw] font-semibold mb-2"> Terms of Use</h1>
          <p className="text-[3.5vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] flex flex-col item-start space-y-2">
            <span><span className="mr-2">⚝</span>Content of binfluence is for general information and use only. It is subject to change without notice</span>
            <span><span className="mr-2">⚝</span>Your use of any information or materials on this website is entirely at your own risk, and we shall not be liable for it. It is your responsibility to ensure that any products, services, or information available through this website meet your specific requirements.</span>
            <span><span className="mr-2">⚝</span>This app contains material that is owned by or licensed to us. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</span>
          </p>
        </div>
        <Footer parentHeight={0}/>
    </Card>
  );
};

export default Terms;