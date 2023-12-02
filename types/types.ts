export interface Tag {
  name: string;
  color: string;
}

export interface Story {
  slug: string;
  metadata: {
    title: string;
    description: string;
    tags: Tag[];
    longitude: number;
    latitude: number;
  };
  component: any;
  thumbnailUrl: string;
}
