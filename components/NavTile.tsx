import Link from "next/link";

const NavTile = ({ title, url }: { title: string; url: string }) => {
  return (
    <Link href={url}>
      <div className="bg-amber-500 w-40 px-8 py-8 inline-block rounded-xl border-2 border-white text-black font-bold hover:scale-105 transition-all duration-200">
        <div className="bg-amber-500">
          <p className="text-center text-xl">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default NavTile;
