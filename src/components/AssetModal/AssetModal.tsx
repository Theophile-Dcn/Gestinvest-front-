import React, { useEffect, useState } from 'react';
import { BaseURL, header } from '../API/API-info';

// Typage des propriétés reçues du Dashboard et utilisées dans le composant AsseModal
type AssetModalProps = {
  switchModalForm: boolean;
  closeAssetModal: () => void;
};

interface Asset {
  id: number;
  name: string;
}

function AssetModal({ switchModalForm, closeAssetModal }: AssetModalProps) {
  // State switchForm utilisé pour changer de formulaire à l'intérieur de la modale
  // sa valeur initiale est celle du switchModalForm fonction du choix de l'utilisateur dans le Dashboard (achat ou vente)
  // switchForm = true affichage du formulaire "achat" ; switchForm = false affichage du formulaire "vente"
  // Etat du state switchForm changé au click sur les boutons "achat" ou "vente"
  const [switchForm, setSwitchForm] = useState(switchModalForm);

  // State formData utilisé pour la transmission des données du formulaire (valeurs initiales vides) sous forme d'objet
  const [formData, setFormData] = useState({
    name: '',
    assetNumber: '',
    price: '',
    date: '',
    fees: '',
  });

  // State asstDataList utilisé pour récupérer la liste des "asset" de la base de données
  const [assetDataList, setAssetDataList] = useState<Asset[]>([]);

  // La fonction handleChange appliquée sur tous les inputs du formulaire met à jour le state formData lorsque
  // l'utilisateur remplit le champs d'un input.
  // on reprend ici le spread operator pour copier l'ensemble de l'objet et ne modifier que la valeur concernée par la mise à jour
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // La fonction handleSubmitBuy ajoute un actif/une transaction à la BDD du l'utilisateur
  async function handleSubmitBuy(event: React.FormEvent) {
    event.preventDefault(); // Evite le rechargement de la page
    await fetch(`${BaseURL}dashboard/buy`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Si le POST a réussi on vide les inputs du formulaire
          setFormData({
            name: '',
            assetNumber: '',
            price: '',
            date: '',
            fees: '',
          });
          console.log('Données transmises avec succès');
        } else {
          console.error('Erreur de soummission des données');
        }
      })
      .catch((error) => {
        console.error('Erreur envoi des données:', error);
      });
  }

  // La fonction handleSubmitBuy ajoute un actif/une transaction à la BDD du l'utilisateur
  async function handleSubmitSell(event: React.FormEvent) {
    event.preventDefault(); // Evite le rechargement de la page
    await fetch(`${BaseURL}dashboard/sell`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Si le POST a réussi on vide les inputs du formulaire
          setFormData({
            name: '',
            assetNumber: '',
            price: '',
            date: '',
            fees: '',
          });
          console.log('Données transmises avec succès');
        } else {
          console.error('Erreur de soummission des données');
        }
      })
      .catch((error) => {
        console.error('Erreur envoi des données:', error);
      });
  }

  // La fonction getAssetList récupère la liste des actifs (asset de notre API)
  async function getAssetList() {
    try {
      const response = await fetch(`${BaseURL}dashboard/modal`, {
        method: 'GET',
        headers: header,
      });
      const data = await response.json();
      setAssetDataList(data);
    } catch (error) {
      console.error('la requete a échoué', error);
    }
  }

  // useEffect appelle la fonction getAssetList à l'ouverture du composant AssetModal
  useEffect(() => {
    getAssetList();
  }, []);

  return (
    <div className="flex content-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <dialog
        open
        className="bg-[#371b4b] flex flex-col content-center p-4 m-auto xl:w-2/6 md:w-8/12 rounded-2xl"
      >
        <button
          type="button"
          onClick={closeAssetModal}
          className="text-white text-xl text-right"
        >
          X
        </button>
        <div className="text-white text-3xl flex justify-center gap-x-16">
          <button
            type="button"
            onClick={() => setSwitchForm(true)}
            className={`${switchForm ? 'underline' : ''}`}
          >
            Achat
          </button>
          <button
            type="button"
            onClick={() => setSwitchForm(false)}
            className={`${!switchForm ? 'underline' : ''}`}
          >
            Vente
          </button>
        </div>
        {switchForm && ( // switchForm=true affichage du formulaire "achat"
          <form action="" onSubmit={handleSubmitBuy}>
            <div className="flex flex-col">
              <label htmlFor="assetName" className="text-white  pt-4 pb-0.5">
                Actif
              </label>
              <input
                list="assetNameList"
                id="assetName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Veuillez entrer le nom de l'actif"
                className="text-sm p-1"
              />
              <datalist id="assetNameList">
                {assetDataList.map((asset) => (
                  <option key={asset.id} value={asset.name}>
                    {}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="flex flex-col">
              <label htmlFor="assetNumber" className="text-white pt-4 pb-0.5">
                Nombre de parts
              </label>
              <input
                type="number"
                id="assetNumber"
                name="assetNumber"
                value={formData.assetNumber}
                onChange={handleChange}
                required
                placeholder="Veuillez entrer le nombre de parts achetées"
                className="text-sm p-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="text-white pt-4 pb-0.5">
                Prix d&apos;achat (€)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Veuiller entrer le prix d'achat"
                className="text-sm p-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-white pt-4 pb-0.5">
                Date de l&apos;achat
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="text-sm p-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fees" className="text-white pt-4 pb-0.5">
                Frais de la transaction (€)
              </label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="Veuillez entrer le montant des frais"
                required
                className="text-sm p-1"
              />
            </div>
            <div className="flex flex-col">
              <p>Montant total de l&apos;achat (€): </p>
            </div>
            <div>
              <input
                type="submit"
                value="Ajouter à mes actifs"
                className="text-white bg-[#9747ff] w-full py-2 rounded hover:text-black hover:bg-white"
              />
            </div>
          </form>
        )}
        {!switchForm && ( // switchForm=false affichage du formulaire "vente"
          <form action="" onSubmit={handleSubmitSell} className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-white  pt-4 pb-0.5">
                Actif
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Veuillez entrer le nom de l'actif"
                required
                className="text-sm p-1"
              />
              <datalist id="assetNameList">
                {assetDataList.map((asset) => (
                  <option key={asset.id} value={asset.name}>
                    {}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="flex flex-col">
              <label htmlFor="asset_number" className="text-white  pt-4 pb-0.5">
                Nombre de parts
              </label>
              <input
                type="number"
                id="quantity"
                name="asset_number"
                value={formData.assetNumber}
                onChange={handleChange}
                placeholder="Veuillez entrer le nombre de parts vendues"
                required
                className="text-sm p-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="text-white  pt-4 pb-0.5">
                Prix de vente (€)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Veuillez entrer le prix de vente"
                required
                className="text-sm p-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-white  pt-4 pb-0.5">
                Date de la vente
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="text-sm p-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fees" className="text-white  pt-4 pb-0.5">
                Frais de la transaction (€)
              </label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="Veuillez entrer le montant des frais"
                required
                className="text-sm p-1"
              />
            </div>
            <div>
              <p>Montant total de la vente : </p>
            </div>
            <div>
              <input
                type="submit"
                value="Retirer de mes actifs"
                className="text-white bg-[#9747ff] w-full py-2 rounded hover:text-black hover:bg-white"
              />
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
}

export default AssetModal;
