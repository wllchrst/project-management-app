import React from "react";
import { signOutCurrentUser } from "../functions/login";

export default function Detail() {
  return <div onClick={signOutCurrentUser}>This is Detail</div>;
}
