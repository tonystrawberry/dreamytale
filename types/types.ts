export interface Tag {
  name: string;
  color: string;
}

export interface Wonder {
  slug: string;
  metadata: {
    name: string;
    description: string;
    tags: Tag[];
    longitude: number;
    latitude: number;
  };
  component: any;
  thumbnailUrl: string;
}
