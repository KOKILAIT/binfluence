"use client";
import Footer from "../../components/Footer";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "../../components/Card";
import DOMPurify from "dompurify";

// function used to control the contact form
export default function ContactForm() {

  // states used to control the inputs: 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const sendEmail = async () => {
    // check if the any of the values are empty
    if (!name || !email || !message) {
      toast.error('Please fill out all info!', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    // Else we check the email first
    try {
      setLoading(true);
      const response = await axios.post("/api/contact", {email: email, name: name, message: message});
      if (response.status === 200 && response.statusText === 'OK'){
      toast.success('Thanks for your message! We love to hear from people and will get back to you if needed.', {
      position: toast.POSITION.TOP_RIGHT });
      }
      else {
        toast.error("Enter a valid email address");
      }
      setName("");
      setEmail("");
      setMessage("");

    } catch (error: any) {
      console.log("feedback failed", error.message);
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <p className="flex flex-col space-y-2 text-[3.5vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw]">
        <span>Get in touch to tell us about a new local recycling, reuse/rehome or repair scheme or a new sustainability initiative.</span>
        <span>You can also report information that needs updating in the app or get in touch for anything else. </span>
        <span>Use the form below or send us an email to {""}
          <a
            href={`mailto:binfluence.aus@gmail.com`}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >binfluence.aus@gmail.com</a></span>
      </p>
      <div className="w-[full] lg:pl-[10%] lg:w-[80%]">
        <Card>
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <img src="/favicon.ico" alt="Visit Us" className="w-[10vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw] xl:w-[5vw] rounded-full" />
              <h1 className="font-semibold text-[5vw] sm:text-[3.2vw] md:text-[2.8vw] lg:text-[2.2vw] xl:text-[1.7vw]"> Send your Feedback</h1>
            </div>

            <div className="space-y-1 text-[3vw] sm:text-[2.8vw] md:text-[2.2vw] lg:text-[1.5vw] xl:text-[1.2vw]">
              <label htmlFor="name">My name: </label>
              <input
                className="p-2 rounded-lg focus:outline-none focus-border-gray-700"
                id="name"
                type="text"
                required
                style={{ width: '100%' }}
                value={name}
                onChange={(e) => setName(DOMPurify.sanitize(e.target.value))}
                placeholder="name" />
              <div>
                <label htmlFor="email">My email address: </label>
                <input
                  className="p-2 rounded-lg focus:outline-none focus-border-gray-700"
                  id="email"
                  required
                  type="text"
                  style={{ width: '100%' }}
                  onChange={(e) => setEmail(DOMPurify.sanitize(e.target.value))}
                  placeholder="email"
                />
              </div>

              <div>

                <label htmlFor="message">My message: </label>
                <textarea
                  className="p-2 rounded-lg focus:outline-none focus-border-gray-700 max-h-[10vh]"
                  id="message"
                  rows={4} // Adjust the number of rows as needed
                  style={{ width: '100%' }}
                  onChange={(e) => setMessage(DOMPurify.sanitize(e.target.value))}
                  placeholder="message"
                  required
                />
              </div>
            </div>
            <button
              className="text-[5vw] sm:text-[3.2vw] md:text-[2.8vw] lg:text-[2.2vw] xl:text-[1.7vw] font-semibold mt-2 border-solid py-[0.5] px-3 border-2 border-[rgb(var(--navy-black))] rounded-lg active:border-[rgb(var(--light-white))] active:text-[rgb(var(--light-white))]"
              onClick={sendEmail}>Submit</button>
          </div>
        </Card>
      </div>
      <ToastContainer />
      <Footer parentHeight={0} />
    </div>
  )
}
