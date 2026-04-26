// Tipo do banco (com id)
export type Tree = {
  id: number;
  name: string;
  description: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
};

// Tipo para criação (sem id)
export type CreateTreeDTO = {
  name: string;
  description: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
};
