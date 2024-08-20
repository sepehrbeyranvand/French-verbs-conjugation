export default function Footer({ darkMode }) {
  return (
    <footer
      className="flex justify-around items-center p-9 text-white bg-[#1e2296]"
      style={darkMode ? { backgroundColor: "#332940" } : { color: "white" }}
    >
      <div>
        <a
          className="text-[2rem]"
          target="_blank"
          rel="noreferrer"
          href="https://www.sepehrbey.ir/"
        >
          Sepehr
        </a>
        <p className="text-zinc-300 text-sm">
          Faculté de langue et littérature françaises, Université d'Ispahan
        </p>
      </div>
      <div className="flex gap-4">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/sepehrbeyranvand"
        >
          <i className="fa fa-github text-lg cursor-pointer hover:text-white transition-all .5s ease-linear duration-200"></i>
        </a>
        <a target="_blank" rel="noreferrer" href="https://t.me/its_sepehrb">
          <i className="fa fa-telegram text-lg cursor-pointer hover:text-white transition-all .5s ease-linear duration-200"></i>
        </a>
        <a target="_blank" rel="noreferrer" href="mailto: sepehr7797@gmail.com">
          <i className="fa fa-envelope text-lg cursor-pointer hover:text-white transition-all .5s ease-linear duration-200"></i>
        </a>
      </div>
    </footer>
  );
}
