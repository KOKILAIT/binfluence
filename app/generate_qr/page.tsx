"use client";
import React, { useState, ChangeEvent } from "react";
import { QRCode } from "react-qrcode-logo";
import Card from "../../components/Card";

export default function QRgen() {
  const [binValue, setBinValue] = useState("");
  const [councilValue, setCouncilValue] = useState("");
  const [baseURL, setBaseURL] = useState("http://localhost:3000/");

  // Create the overall URL by combining baseURL, councilValue, and binValue
  const overallURL = `${baseURL}qr_redirect?council=${councilValue}&bin=${binValue}`;

  return (
    <Card>
      <div className="flex flex-col h-full w-full items-center">
        <h1 className="text-[3.5vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw]">QR Code Generator App</h1>

        <textarea
          className="w-72 m-2 text-[3vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.5vw] xl:text-[1.2vw] text-center rounded-md shadow-md p-1"
          placeholder="Enter Council"
          onChange={(e) => setCouncilValue(e.target.value)}
        />

        <textarea
          className="w-72 m-2 text-[3vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.5vw] xl:text-[1.2vw] text-center rounded-md shadow-md p-1"
          placeholder="Enter Bin"
          onChange={(e) => setBinValue(e.target.value)}
        />

        <textarea
          className="w-72 m-2 text-[3vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.5vw] xl:text-[1.2vw] text-center rounded-md shadow-md p-1"
          placeholder="Enter base url"
          defaultValue={baseURL}
          onChange={(e) => setBaseURL(e.target.value)}
        />

        <div className="text-[3vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.5vw] xl:text-[1.2vw] text-center ">QR URL: {overallURL}</div>
        <div className="relative">
          <img
            src="images/logo-closed-up.png"
            alt="logo"
            className="w-[76px] absolute bottom-[7px] right-[7px]"
          />
          <QRCode
            value={overallURL} // Use overallURL as the QR code value
            // logoImage="images/logo-closed-up.png"
            logoWidth={84}
            logoHeight={80}
            size={300}
          />
        </div>


        {/* <QRCode
          value={overallURL} // Use overallURL as the QR code value
          logoImage="images/logo-closed-up.png"
          logoWidth={84}
          logoHeight={80}
          size={300}
        /> */}
      </div>

    </Card>
  );
}
