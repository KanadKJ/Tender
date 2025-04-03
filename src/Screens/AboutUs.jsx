import React, { useEffect } from "react";
import Background from "../Components/Background";

export default function AboutUs() {
  return (
    <div className="mt-20 ">
      <Background type={"default"} show="no" />
      <div className="w-full flex flex-col gap-4 relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 mt-16">
        <h1 className="w-full text-center text-6xl font-normal text-black mt-8">
          About Us
        </h1>
      </div>
      <div className="flex flex-col gap-10 px-10 my-10 text-justify">
        <p className="">
          E Tender Mitra is a branch Menoka Enterprise, we specialize in
          providing comprehensive tender information across West Bengal to help
          businesses and contractors stay ahead in the competitive bidding
          process. Our platform offers real-time updates on government tenders,
          ensuring you never miss an opportunity. We, etendermitra, are building
          a one-stop platform for contractors collecting tenders in West Bengal.
          The best part of our offering is that the entire platform is currently
          managed by mobile applications and web.{" "}
        </p>
        <p className="">
          Use our powerful search engine to find tender information in just a
          few clicks. Get notifications for tender updates on your mobile
          Nowadays, many people are involved in the contracting business. Most
          contractors are a group of people who handle the work of collecting,
          securing tenders. While working outside small towns and villages, due
          to lack of technical and digital knowledge, contractors face
          inefficiencies that limit their profits and hamper growth.
        </p>
        <p className="">
          We go beyond just providing tender details – our expert team assists
          in bid submission, documentation, and strategic guidance, helping
          contractors and businesses maximize their chances of winning
          contracts. We have been working in the field of bid submission for
          more than 10 years. With a deep understanding of the tendering
          landscape, we simplify the process, ensuring a smooth and successful
          experience.
        </p>
        <p className="">
          We help our platform users to expand rapidly and submit bids. We are
          already associated with contractors from many districts of West
          Bengal. And we help in submitting bids.
        </p>
        <p className="">
          Join hands with E Tender Mitra and take your business to the next
          level with accurate, timely, and reliable tender solutions.
        </p>
        <p className="">
          Our goal is to be the most trusted platform in the construction
          industry through technology and innovative services. Your success in
          tendering starts here!
        </p>
        <p className="w-full text-center">
          Our google review link is-{" "}
          <a className="text-[#0554F2]" href="https://g.co/kgs/dEEg98Z">
            https://g.co/kgs/dEEg98Z
          </a>
        </p>
      </div>
    </div>
  );
}
