const importAll = (r: any): Promise<any[]> =>
  Promise.all(
    r.keys().map(async (fileName: string) => {
      const story = r(fileName);
      const slug = fileName.substr(2).replace(/\/content\.mdx$/, "");

      return {
        slug,
        component: story?.default,
        metadata: story?.metadata,
        thumbnailUrl: "/wonders/" + slug + "/thumbnail.jpg",
      }
    })
  );

export const getAllWonders = async (): Promise<any[]> =>
  importAll(
    //@ts-ignore
    require.context("../app/wonders/", true, /^\.\/[^\/]+\/content\.mdx$/)
  );

// Get a specific story data by slug (e.g. "the-temple-of-artemis")
export const getStoryBySlug = async (slug: string): Promise<any> => {
  const story = require(`../app/wonders/${slug}/content.mdx`);

  return {
    slug,
    component: story?.default,
    metadata: story?.metadata,
    readingTime: story?.metadata_readingTime,
    thumbnailUrl: "/wonders/" + slug + "/thumbnail.jpg",
  };
};
