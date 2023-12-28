import ThemeToggle from "./ThemeToggle/ThemeToggle";

function Header() {
  return (
    <header
      className="relative flex justify-center bg-[#2C3659] 
    py-[20px] font-bold uppercase tracking-wider"
    >
      <span className="text-white"> Engl </span>
      <span className="text-[#C5F31D]"> Rush </span>
      <div className="absolute right-10 text-white">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
