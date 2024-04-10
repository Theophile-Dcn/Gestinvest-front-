import './Footer.scss';

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full flex justify-around items-center h-12 bg-black opacity-100 text-xs sm:text-sm">
      <p className="text-center flex">
        © 2024 Gestinvest.
        <span className="hidden md:block">All rights reserved.</span>
      </p>
      <a
        href="/politique-de-confidentialité"
        className="my-auto text-white hover:underline underline-offset-4 cursor-pointer"
      >
        politique de confidentialité
      </a>
      <a
        href="/condition-utilisation"
        className="my-auto text-white hover:underline underline-offset-4 cursor-pointer"
      >
        Conditions d&apos;utilisation
      </a>
    </footer>
  );
}

export default Footer;
