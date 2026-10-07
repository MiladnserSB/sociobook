import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/UserContext";
import { request } from "../lib/service";

type Album = {
  userId: number;
  id: number;
  title: string;
};

const Albums = () => {
  const { userId } = useContext(userContext);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    if (userId === -1) return;

    const getAlbums = async () => {
      const data = await request(`albums?userId=${userId}`);
      setAlbums(data);
    };

    getAlbums();
  }, [userId]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Albums</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <article key={album.id} className="rounded-lg border bg-card p-5">
            <h2 className="font-semibold capitalize">{album.title}</h2>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Albums;
