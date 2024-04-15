import quatre from '../../assets/404-4.png';
import rocket from '../../assets/404Rocket.png';
import astronaute from '../../assets/astronaute.png';
import BackgroundBeams from '../ui/BackgroundBeams';

export default function BackgroundBeamsDemo() {
  return (
    <div className="h-[84vh] w-full rounded-md bg-black/35 relative flex flex-col items-center justify-center antialiased">
      <div className="flex gap-14 mb-9 justify-center">
        <img className="w-1/6 z-20" src={quatre} alt="" />
        <img className="w-[15%] z-20 animate-spin" src={astronaute} alt="" />
        <img className="w-1/6 z-20" src={quatre} alt="" />
      </div>
      <div className="max-w-2xl mx-auto p-4" />
      <div className=" bg-white/10 rounded-xl flex gap-16 p-6 w-3/6">
        <div className="">
          <h1 className="text-center text-2xl">Plusieurs raisons possibles:</h1>
          <p className="my-4 text-lg">
            Théo pense qu&apos;une fusée s&apos;est écrasée sur le serveur
          </p>
          <p className="my-4 text-lg">
            Romain a encore fait une analyse{' '}
            <span className="line-through">raté</span> du pepecoin
          </p>
          <p className="my-4 text-lg">
            Hugo pense que toute chose arrive pour une bonne raison
          </p>

          <p className="my-4 text-lg">
            Samir a mis à jour le serveur avec ca nouvelle modal
          </p>
          <p className="my-4 text-lg">
            Ludo pense que c&apos;est Théo qui a lancé la fusée
          </p>
        </div>
        <img className="w-2/6 z-20" src={rocket} alt="" />
      </div>
      <BackgroundBeams />
    </div>
  );
}
