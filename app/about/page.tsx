"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col items-center content-center self-center">
      <div className="flex items-center content-center">
        <Image
          width={240}
          height={240}
          src={"/favicon.png"}
          alt={"codemetrics logo"}
          className="d"
        />
        <div className="flex flex-col items-center content-center ml-10">
          <h1>About codemetrics</h1>
          <p className="text-center">
            Codemetrics is an app that automatically analyzes source code
            written in Python to collect statistics, such as the number and size
            of classes and functions, global variables, comments, conditional
            statements, and loops, will calculate variable and function name
            length averages. Additionally, you will identify external and local
            dependencies and, where possible, provide an analysis of the
            complexity of the functions. All these statistics can be used to
            detect bad smells in the code, evaluate its quality or help meet
            coding standards when integrated with other tools.
          </p>
        </div>
      </div>
      <h1>Developed by:</h1>
      <div className="flex align-center justify-center gap-8">
        <Profile
          name="Yenifer Yulieth Mora Segura"
          image="/yenifer.jpg"
          githubLink="https://github.com/YeniferMora"
        />
        <Profile
          name="Andres David Ramirez Chiquillo"
          image="/Andres.jpeg"
          githubLink="https://github.com/Andrurachi"
        />
        <Profile
          name="Jefferson Duvan Ramirez Castañeda"
          image="/Jefferson.png"
          githubLink="https://github.com/jeramirezca"
        />
      </div>
    </div>
  );
}

interface ProfileProps {
  name: string;
  image: string;
  githubLink: string;
}

const Profile = ({ name, image, githubLink }: ProfileProps) => {
  return (
    <div className="flex flex-col text-center w-60 flex-wrap ">
      <Image
        width={200}
        height={200}
        src={image}
        alt={"codemetrics logo"}
        className="my-10 rounded-full self-center"
      />
      <div className="flex">
        <svg
          className="w-12 h-12 self-center text-indigo-300 fill-current hover:text-indigo-500"
          onClick={() => {window.location.href = githubLink}}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
        <div className="flex flex-col">
          <p >{name}</p>
          <p className="text-indigo-300">Software Engineer Student</p>
        </div>
      </div>
    </div>
  );
};
