export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  poster_path: string;
}

export interface Person {
  id: number;
  name: string;
}

export interface ApiConfig {
  images: {
    secure_base_url: string;
    poster_sizes: string[];
  };
}
