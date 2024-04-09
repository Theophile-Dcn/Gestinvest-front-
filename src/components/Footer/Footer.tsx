import './Footer.scss';

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full flex justify-around items-center h-12 bg-black opacity-30">
      <p className="text-center">© 2021 Gestinvest. All rights reserved.</p>
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
