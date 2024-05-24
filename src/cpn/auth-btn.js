"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
export default function AuthBtn() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <>
        <h3>{`${session.user.name} - ${session.user.email}`}</h3>
        <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
}
