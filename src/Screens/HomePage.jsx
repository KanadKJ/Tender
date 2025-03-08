import React from "react";
import { useSelector } from "react-redux";
import Background from "../Components/Background";

export default function HomePage() {
  const { userData } = useSelector((s) => s.auth);

  return (
    <div className="mt-16 ">
      <Background type={"default"} />
      <div>
        <h1> fadHome</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <h1>Home</h1>
      </div>
    </div>
  );
}
