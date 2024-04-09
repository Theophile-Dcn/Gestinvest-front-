function Politique() {
  return (
    <div className="text-left w-1/2 m-auto">
      <h1 className="text-center my-5 text-2xl">
        Politique de confidentialité de Gestinvest
      </h1>
      <p className="my-4">
        Dernière mise à jour : 09/04/2024 <br />
        <br />
        Gestinvest s&apos;engage à protéger la confidentialité de ses
        utilisateurs.
        <br />
        <br />
        Cette politique de confidentialité décrit les types d&apos;informations
        que nous collectons, comment nous les utilisons et les protégeons.
      </p>
      <div>
        <h2 className="my-4">1. Informations collectées</h2>
        <p>
          Nous collectons les informations suivantes :
          <ul>
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse e-mail</li>
            <li>
              Données financières (telles que les investissements en
              cryptomonnaies et en actions)
            </li>
          </ul>
        </p>
        <h2 className="my-2">2.Méthodes de collecte</h2>
        <p>
          Toutes les informations sont saisies manuellement par les utilisateurs
          dans l&apos;application Gestinvest.
        </p>
        <h2 className="my-4">3.Utilisation des informations</h2>
        <p>
          Nous utilisons les informations collectées uniquement pour fournir les
          fonctionnalités de notre application. Ces informations ne sont pas
          utilisées à des fins de marketing ou de recherche.
        </p>
        <h2 className="my-2">4.Partage d&apos;informations</h2>
        <p>Nous ne partageons aucune information avec des tiers.</p>
        <h2 className="my-2">5.Sécurité des données</h2>
        <p>
          Toutes les données sont protégées grâce à une gestion des tokens JWT
          (JSON Web Tokens) pour assurer la sécurité des informations des
          utilisateurs.
        </p>
        <h2 className="my-2">6.Cookies et technologies similaires</h2>{' '}
        <p>
          Notre application n&apos;utilise pas de cookies ni de technologies
          similaires.
        </p>
        <h2 className="my-2">7.Droits des utilisateurs</h2>
        <p>
          Les utilisateurs ont le droit de modifier ou de supprimer leurs
          données personnelles à tout moment.
        </p>
        <h2 className="mb-2">8.Coordonnées</h2>
        <p>
          Pour toute question ou préoccupation concernant notre politique de
          confidentialité, veuillez nous contacter à l&apos;adresse e-mail
          suivante : gestinvest@gmail.com
        </p>
      </div>
    </div>
  );
}

export default Politique;
