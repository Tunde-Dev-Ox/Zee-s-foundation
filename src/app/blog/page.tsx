import { contentfulClient } from "@/lib/contentfulClient";
import { notFound } from "next/navigation";
import BlogClient from "@/app/components/BlogClient";

export const revalidate = 60;

interface BlogPost {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    author: string;
    category: string;
    featuredImage?: { fields: { file: { url: string } } };
    publishedDate: string;
    body?: unknown;
  };
}

async function getPosts(): Promise<BlogPost[]> {
  const res = await contentfulClient.getEntries({
    content_type: "ngoblog",
    order: ["-fields.publishedDate"] as any,
  });
  
  return res.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      title: (item.fields.title ?? "") as string,
      slug: item.fields.slug as string,
      author: item.fields.author as string,
      category: item.fields.category as string,
      featuredImage: item.fields.featuredImage
        ? { fields: { file: { url: (item.fields.featuredImage as any).fields?.file?.url || "" } } }
        : undefined,
      publishedDate: item.fields.publishedDate ? String(item.fields.publishedDate) : "",
      body: item.fields.body,
    },
  }));
}

export default async function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const posts = await getPosts();

  if (!posts.length) {
    notFound();
  }

  return <BlogClient posts={posts} searchParams={searchParams} />;
}
