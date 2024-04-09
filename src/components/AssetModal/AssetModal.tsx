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
          <form action="">
            <div>
              <label htmlFor="name">Nom de l&apos;actif : </label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="quantity">Nombre de parts achetées : </label>
              <input type="number" id="quantity" name="quantity" required />
            </div>
            <div>
              <label htmlFor="price">Prix d&apos;achat (€): </label>
              <input type="number" id="price" name="price" required />
            </div>
            <div>
              <label htmlFor="date">Date de l&apos;achat : </label>
              <input type="date" id="date" name="date" required />
            </div>
            <div>
              <label htmlFor="charges">Frais de transaction (€) : </label>
              <input type="number" id="charges" name="charges" required />
            </div>
            <div>
              <label htmlFor="total">Montant total de l&apos;achat (€): </label>
              <input type="number" id="total" name="total" required />
            </div>
            <div>
              <input type="submit" value="Ajouter à mes actifs" />
            </div>
          </form>
        )}
        {!switchForm && ( // switchForm=false affichage du formulaire "vente"
          <form action="">
            <div>
              <label htmlFor="name">Nom de l&apos;actif : </label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="quantity">Nombre de parts vendues (€) : </label>
              <input type="number" id="quantity" name="quantity" required />
            </div>
            <div>
              <label htmlFor="price">Prix de vente (€): </label>
              <input type="number" id="price" name="price" required />
            </div>
            <div>
              <label htmlFor="date">Date de la vente : </label>
              <input type="date" id="date" name="date" required />
            </div>
            <div>
              <label htmlFor="charges">Frais de transaction (€) : </label>
              <input type="number" id="charges" name="charges" required />
            </div>
            <div>
              <label htmlFor="total">Montant total de la vente (€): </label>
              <input type="number" id="total" name="total" required />
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
