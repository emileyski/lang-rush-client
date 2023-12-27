import { useState } from 'react';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <header className="flex justify-center bg-[#2C3659] py-[20px] font-bold uppercase tracking-wider">
      <span className="text-white"> Engl </span>
      <span className="text-[#C5F31D]"> Rush </span>
      <div className="absolute right-10 text-white">
        <div className="flex w-16 flex-row">
          <div className="flex w-16 flex-row rounded-[100px] bg-[#242b47]">
            <div
              id="Ellipse"
              className="bg-50%_50% flex w-8 flex-row items-end bg-[url(https://file.rendit.io/n/fA1JxwmVPwoTKalpGlsX.svg)] bg-cover bg-no-repeat px-1 pt-1 bg-blend-normal"
            >
              <img
                src="https://file.rendit.io/n/IQgqSoeILEsOIbGfaT4D.svg"
                alt="Femoon"
                id="Femoon"
                className="mb-1 w-6"
              />
            </div>
          </div>
        </div>{' '}
      </div>
    </header>
  );
}

export default Header;
