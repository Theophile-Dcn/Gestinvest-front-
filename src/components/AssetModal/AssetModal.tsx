import React, { useEffect, useState } from 'react';
import { BaseURL, header } from '../API/API-info';

// Typage des propriétés reçues du Dashboard et utilisées dans le composant AsseModal
type AssetModalProps = {
  switchModalForm: boolean;
  closeAssetModal: () => void;
};

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
  const [assetDataList, setAssetDataList] = useState([]);

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
    <div>
      <dialog open>
        <button type="button" onClick={closeAssetModal}>
          X
        </button>
        <button type="button" onClick={() => setSwitchForm(true)}>
          Achat
        </button>
        <button type="button" onClick={() => setSwitchForm(false)}>
          Vente
        </button>
        {switchForm && ( // switchForm=true affichage du formulaire "achat"
          <form action="" onSubmit={handleSubmitBuy}>
            <div>
              <label htmlFor="assetName">Nom de l&apos;actif : </label>
              <input
                list="assetNameList"
                id="assetName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <datalist id="assetNameList">
                {assetDataList.map((asset) => (
                  <option key={asset.id} value={asset.name}/>))}
              </datalist>
            </div>
            <div>
              <label htmlFor="assetNumber">Nombre de parts achetées : </label>
              <input
                type="number"
                id="assetNumber"
                name="assetNumber"
                value={formData.assetNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Prix d&apos;achat (€): </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Date de l&apos;achat : </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="fees">Frais de transaction (€) : </label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Montant total de l&apos;achat (€): </p>
            </div>
            <div>
              <input type="submit" value="Ajouter à mes actifs" />
            </div>
          </form>
        )}
        {!switchForm && ( // switchForm=false affichage du formulaire "vente"
          <form action="" onSubmit={handleSubmitSell}>
            <div>
              <label htmlFor="name">Nom de l&apos;actif : </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="asset_number">
                Nombre de parts vendues (€) :{' '}
              </label>
              <input
                type="number"
                id="quantity"
                name="asset_number"
                value={formData.asset_number}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Prix de vente (€): </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Date de la vente : </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="fees">Frais de transaction (€) : </label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <p>Montant total de la vente : </p>
            </div>
            <div>
              <input type="submit" value="Retirer de mes actifs" />
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
}

export default AssetModal;
