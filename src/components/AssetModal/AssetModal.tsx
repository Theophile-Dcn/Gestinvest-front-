import React, { useState } from 'react';

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
    asset_number: '',
    price: '',
    date: '',
    fees: '',
  });

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
    await fetch('/api/dashboard/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Si le POST a réussi on vide les inputs du formulaire
          setFormData({
            name: '',
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
    await fetch('/api/dashboard/sell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Si le POST a réussi on vide les inputs du formulaire
          setFormData({
            name: '',
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
              <label htmlFor="name">Nom de l&apos;actif : </label>
              <input
                type="text"
                id="name"
                name="name"
                value="{formData.name}"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="asset_number">Nombre de parts achetées : </label>
              <input
                type="number"
                id="asset_number"
                name="asset_number"
                value="{formData.asset_number}"
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
                value="{formData.price}"
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
                value="{formData.date}"
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
                value="{formData.fees}"
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
                value="{formData.name}"
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
                value="{formData.asset_number}"
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
                value="{formData.price}"
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
                value="{formData.date}"
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
                value="{formData.fees}"
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
