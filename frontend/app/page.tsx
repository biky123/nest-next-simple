import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Link href="/register">Register</Link>
      <br />
      <Link href="/login">Login</Link>
      
    </div>
  );
}
