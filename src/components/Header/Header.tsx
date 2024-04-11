import Nav from './Nav';

function Header() {
  // const handleShowlinks = () => {
  //   setShowLinks(!showLinks);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   window.location.href = '/';
  // };

  return (
    <div className="bg-slate-900">
      <Nav />
    </div>
  );
}

export default Header;
