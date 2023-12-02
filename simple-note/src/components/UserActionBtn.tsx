"use client";

import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function UserActionBtn() {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
    >
      Sign Out
    </Button>
  );
}
