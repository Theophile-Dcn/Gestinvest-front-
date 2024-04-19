import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BaseURL, header } from '../API/API-info';
import GetAccountInfo from '../API/account-api';

interface UserData {
  email: string;
  last_name: string;
  first_name: string;
  password: string;
}

function Account() {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    last_name: '',
    first_name: '',
    password: '',
  });

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await GetAccountInfo();
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };

    fetchAccountInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BaseURL}account/`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          email: userData.email,
          lastname: userData.last_name,
          firstname: userData.first_name,
          password: userData.password,
        }),
      });

      const newData = await response.json();

      if (response.ok) {
        toast.success('Mise a jour reussi');
        if (newData.token) {
          localStorage.setItem('token', newData.token);
        }
        setUserData(newData.userUpdated); // Mettre à jour avec les données renvoyées par le backend
      } else {
        toast.error(newData.errorMessage);
        console.error('Erreur de soumission des données');
      }
    } catch (error) {
      console.error('Erreur envoi des données:', error);
    }
  };
  // const handleDeleteAccount = async () => {
  //   try {
  //     // Appel à l'API pour supprimer le compte
  //     await fetch(`${BaseURL}account/${userData.id}`, {
  //       method: 'DELETE',
  //       headers: header,
  //     });
  //     console.log('Compte supprimé avec succès');
  //     // Vous pouvez également rediriger l'utilisateur vers une page de confirmation ou de déconnexion ici
  //   } catch (error) {
  //     console.error('Erreur lors de la suppression du compte :', error);
  //   }
  // };

  return (
    <div
      id="account"
      className="flex flex-col h-[84vh] m-auto items-center justify-center w-full p-6 sm:w-5/6 lg:w-3/6"
    >
      <h2 className="text-lg uppercase font-bold p-10 sm:text-xl md:text-2xl xl:text-3xl">
        Gestion du profil
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5">
            <label
              className="p-4 text-xs md:text-sm font-bold"
              htmlFor="first_name"
            >
              Prénom :
            </label>
          </div>
          <input
            className=" pl-4 bg-transparent w-full rounded-r-lg"
            type="text"
            id="first_name"
            name="first_name"
            placeholder={userData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5">
            <label
              className="p-4 text-xs font-bold md:text-sm"
              htmlFor="last_name"
            >
              Nom :
            </label>
          </div>
          <input
            className=" pl-4 bg-transparent w-full rounded-r-lg"
            type="text"
            id="last_name"
            name="last_name"
            placeholder={userData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5 ">
            <label className="p-4 text-xs font-bold md:text-sm" htmlFor="email">
              E-mail :
            </label>
          </div>

          <input
            className="pl-4 bg-transparent w-full rounded-r-lg"
            type="email"
            id="email"
            name="email"
            placeholder={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5 ">
            <label
              className="p-4 text-xs font-bold md:text-sm"
              htmlFor="password"
            >
              Mot de passe :
            </label>
          </div>

          <input
            className="pl-4 bg-transparent w-full rounded-r-lg"
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            placeholder="*************"
          />
        </div>
        {/* <div className="flex border border-white rounded-xl bg-white/10 w-full">
          <div className="flex border-r w-2/5 ">
            <label
              className="p-4 text-xs font-bold md:text-sm"
              htmlFor="confirmation"
            >
              Confirmation
            </label>
          </div>

          <input
            className="pl-4 bg-transparent w-full rounded-r-lg"
            type="password"
            id="confirmation"
            name="confirmation"
            placeholder="*************"
            onChange={handleInputChange}
          />
        </div> */}
        <div className="flex justify-center gap-10">
          <button
            className="hover:bg-custom-purple border-buttonColor shadow-lg shadow-indigo-500/30 text-center text-sm mt-4 border text-white rounded-full px-3 py-2 lg:m-0 lg:my-8 lg:text-base lg:px-6 lg:py-2"
            type="submit"
          >
            Sauvegarder
          </button>
          {/* Bouton pour supprimer le compte */}
          {/* <button
            className="hover:bg-custom-purple border-buttonColor shadow-lg shadow-indigo-500/30 text-center text-sm mt-4 border text-white rounded-full px-3 py-2 lg:m-0 lg:my-8 lg:text-base lg:px-6 lg:py-2"
            type="button"
            // onClick={handleDeleteAccount}
          >
            Supprimer le compte
          </button> */}
        </div>
      </form>
    </div>
  );
}
export default Account;
