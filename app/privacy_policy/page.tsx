import React from "react";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

// page to display privacy policy
const Privacy_Policy: React.FC = () => {
    return(
        <div className="flex-col">
        <Card>
          <h1 className="text-[5vw] sm:text-[3.2vw] md:text-[2.8vw] lg:text-[2.2vw] xl:text-[1.7vw] font-semibold mb-2"> Privacy Policy</h1>
          <p className="flex flex-col item-start space-y-2 text-[3.5vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw]">
            <span><i>binfluence</i> will not collect any personal information from users, and ....</span>
            <span>Product owner GreenQueen will not be eligible for any privacy losses across the usage of binfluence</span>
          </p>
        </Card>
        <Footer parentHeight={0}/>
        </div>
    )
}

export default Privacy_Policy;