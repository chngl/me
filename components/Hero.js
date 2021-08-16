import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { useEffect, useRef } from 'react'

import Image from 'next/image'
import React from 'react'
import Typed from 'typed.js'
import confetti from 'canvas-confetti'

export default function Hero() {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  // Create reference to store the Typed instance itself
  const typed = useRef(null);

  useEffect(() => {
    // fire confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    // set up typing animation
    const options = {
      strings: [
        'Hello world! This is Chang!',
        'I am a full stack software engineer with a passion to create end to end solution to solve problems at scale.'
      ],
      typeSpeed: 40,
      backSpeed: 30,
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    }
  }, []);

  return (
    <div className="flex flex-col items-center flex-shrink-0 w-full box-border p-12 shadow-sm bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 ">
      <div className="bg-gray-100 rounded-full p-2 flex items-center justify-center flex-shrink-0">
        <Image className="rounded-full" src="/images/profile.jpg" alt="profile" width={100} height={100} />
      </div>
      <div className="text-xl cursor-pointer" onClick={() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }}>
        Chang Liu
        </div>
      <div className="flex items-center my-2">
        <a href="https://www.linkedin.com/in/chang-liu-87038691/" className="mx-2">
          <FaLinkedinIn className="text-gray-400" />
        </a>
        <a href="https://github.com/chngl">
          <FaGithub className="text-gray-400" />
        </a>
      </div>
      <div className="text-gray-500 my-4" onClick={() => typed.current.reset()}>
        <span ref={el} />
      </div>
    </div>
  );
}
