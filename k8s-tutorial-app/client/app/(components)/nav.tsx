import Link from "next/link";

function Nav() {
  return (
    <nav className="w-full h-[5rem] text-xl">
      <ul className="flex justify-between items-center w-full h-full">
        <li><Link href="">Home</Link></li>
        <section className="flex justify-between w-[13rem]">
          <li className="transition-all hover:transform hover:scale-110"><Link href="/auth/login">Log In</Link></li>
          <li className="transition-all hover:transform hover:scale-110"><Link href="/auth/signup">Sign Up</Link></li>
        </section>
      </ul>
    </nav>
  );
};

export default Nav;