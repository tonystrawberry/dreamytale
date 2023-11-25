const importAll = (r): Promise<any[]> =>
  Promise.all(
    r.keys().map(async (fileName) => {
      const module = r(fileName);
      const slug = fileName.substr(2).replace(/\/page\.mdx$/, "");

      return {
        slug,
        metadata: module?.metadata,
        component: module?.default,
        readingTime: module?.metadata_readingTime,
        thumbnailUrl: "/stories/" + slug + "/thumbnail.jpg",
      } satisfies any;
    })
  );

export const getAllStories = async (): Promise<any[]> =>
  importAll(
    //@ts-ignore
    require.context("../app/stories/", true, /^\.\/[^\/]+\/page\.mdx$/)
  );

export const getStoryBySlug = async (slug: string): Promise<any> => {
  const module = require(`../app/stories/${slug}/page.mdx`);

  return {
    slug,
    component: module?.default,
    metadata: module?.metadata,
    readingTime: module?.metadata_readingTime,
  };
};
