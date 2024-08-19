"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Index = () => {
  const { data } = useSession();
  return (
    <>
      <p>{JSON.stringify(data)}</p>
      <a href="#" onClick={() => signOut()}>signout</a>
    </>
  );
};

export default Index;
