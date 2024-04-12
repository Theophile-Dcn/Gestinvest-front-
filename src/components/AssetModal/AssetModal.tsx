import React, { useEffect, useState } from 'react';
import { BaseURL, header } from '../API/API-info';

// Typage des propriétés reçues du Dashboard et utilisées dans le composant AsseModal
type AssetModalProps = {
  closeAssetModal: () => void;
  allAsset: Asset[];
};

interface Asset {
  asset_name: string;
  category_name: string;
}

function AssetModal({ closeAssetModal }: AssetModalProps) {
  // State formData utilisé pour la transmission des données du formulaire (valeurs initiales vides) sous forme d'objet
  const [formData, setFormData] = useState({
    asset_name: '',
    asset_number: '',
    price: '',
    date: '',
    fees: '',
  });
  // State asstDataList utilisé pour récupérer la liste des "asset" de la base de données
  const [assetDataList, setAssetDataList] = useState<Asset | unknown>(null);
  // La fonction getAssetList récupère la liste des actifs (asset de notre API)
  async function getAssetList() {
    try {
      const response = await fetch(`${BaseURL}dashboard/modal`, {
        method: 'GET',
        headers: header,
      });
      const data = await response.json();
      setAssetDataList(data);
      console.log(setAssetDataList);
      console.log(data);
    } catch (error) {
      console.error('la requete a échoué', error);
    }
  }

  // useEffect appelle la fonction getAssetList à l'ouverture du composant AssetModal
  useEffect(() => {
    getAssetList();
  }, []);

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
            asset_name: '',
            asset_number: '',
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
            asset_name: '',
            asset_number: '',
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <dialog
        open
        className="fixed top-2/4 left-2/4 bg-[#2a213c] border border-white rounded-xl shadow-lg p-4 w-5/6 md:w-2/4 xl:w-2/5 2xl:w-2/6 transform -translate-x-2/4 -translate-y-2/4"
      >
        <button
          type="button"
          onClick={closeAssetModal}
          className="text-white p-2 absolute right-5 top-2"
        >
          X
        </button>
        <div className="text-white text-3xl flex justify-center gap-x-16 mt-6">
          <p>Ajouter une transaction</p>
        </div>
        <form action="">
          <div className="flex flex-col justify-center items-center p-4">
            <label
              htmlFor="asset_name"
              className="pt-4 pb-2 text-white w-full text-start"
            >
              Actif
            </label>
            <input
              list="assetNameList"
              id="asset_name"
              name="asset_name"
              value={formData.asset_name}
              onChange={handleChange}
              required
              placeholder="Veuillez entrer le nom de l'actif"
              className="rounded-md p-1 w-full"
            />
            <datalist id="assetNameList">
              {assetDataList && assetDataList.allAsset && (
                <datalist id="assetNameList">
                  {assetDataList.allAsset.map(
                    (asset: { asset_name: string }, index: number) => (
                      <option key={index} value={asset.asset_name} />
                    )
                  )}
                </datalist>
              )}
            </datalist>
            {/* </div> */}
            {/* <div className="flex flex-col justify-center items-center p-4"> */}
            <label
              htmlFor="asset_number"
              className="pt-4 pb-2 text-white w-full text-start"
            >
              Nombre de parts
            </label>
            <input
              type="number"
              id="asset_number"
              name="asset_number"
              value={formData.asset_number}
              onChange={handleChange}
              required
              placeholder="Veuillez entrer le nombre de parts"
              className="rounded-md p-1 w-full"
            />
            {/* </div> */}
            {/* <div className="flex flex-col justify-center items-center p-4"> */}
            <label
              htmlFor="price"
              className="pt-4 pb-2 text-white w-full text-start"
            >
              Prix unitaire de l&apos;actif ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Veuiller entrer le prix"
              className="rounded-md p-1 w-full"
            />
            {/* </div> */}
            {/* <div className="flex flex-col justify-center items-center p-4"> */}
            <label
              htmlFor="date"
              className="pt-4 pb-2 text-white w-full text-start"
            >
              Date de la transaction
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="rounded-md p-1 w-full"
            />
            {/* </div> */}
            {/* <div className="flex flex-col justify-center items-center p-4"> */}
            <label
              htmlFor="fees"
              className="pt-4 pb-2 text-white w-full text-start"
            >
              Frais de la transaction (%)
            </label>
            <input
              type="number"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Veuillez entrer le pourcentage des frais"
              required
              className="rounded-md p-1 w-full"
            />
          </div>

          <div className="flex items-center justify-center w-full gap-8">
            {/* <div className="w-1/3"> */}
            <input
              type="button"
              value="Achat"
              className="w-1/3 p-2 my-6 hover:border-custom-purple font-bold hover:bg-green-600 hover:text-white text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
              onClick={handleSubmitBuy}
            />
            {/* </div> */}
            {/* <div className="w-1/3"> */}
            <input
              type="button"
              value="Vente"
              className="w-1/3 p-2 my-6 hover:border-custom-purple font-bold hover:bg-red-600 hover:text-white text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
              onClick={handleSubmitSell}
            />
            {/* </div> */}
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default AssetModal;
