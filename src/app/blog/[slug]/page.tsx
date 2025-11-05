import { contentfulClient } from "@/lib/contentfulClient";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Document } from "@contentful/rich-text-types";
import Image from "next/image";
import Header from "@/app/components/header/page";
import Footer from "@/app/components/footer/page";
import { notFound } from "next/navigation";
import { Metadata } from "next";


interface BlogPost {
  title: string;
  slug: string;
  author: string;
  category: string;
  featuredImage?: { url: string };
  authorImage?: { url: string };
  publishedDate: string;
  body: Document;
}

// Generate static paths
export async function generateStaticParams() {
  const res = await contentfulClient.getEntries({
    content_type: "ngoblog",
  });

  return res.items.map((item: any) => ({
    slug: item.fields?.slug as string,
  }));
}

// Fetch single post by slug
async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await contentfulClient.getEntries({
    content_type: "ngoblog",
    "fields.slug": slug,
    limit: 1,
  });

  if (!res.items.length) return null;

  const post = res.items[0];

  return {
    title: (post.fields.title ?? "") as string,
    slug: post.fields.slug as string,
    author: post.fields.author as string,
    category: post.fields.category as string,
    featuredImage:
      post.fields.featuredImage && (post.fields.featuredImage as any).fields?.file?.url
        ? { url: `https:${(post.fields.featuredImage as any).fields.file.url}` }
        : undefined,
    authorImage:
      post.fields.authorImage && (post.fields.authorImage as any).fields?.file?.url
        ? { url: `https:${(post.fields.authorImage as any).fields.file.url}` }
        : undefined,
    publishedDate: post.fields.publishedDate ? String(post.fields.publishedDate) : "",
    body: post.fields.body as Document,
  };
}

// Enhanced SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: "Post not found",
      description: "The requested blog post could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.zirachifoundation.org';
  const postUrl = `${siteUrl}/blog/${params.slug}`;
  const postImage = post.featuredImage?.url || `${siteUrl}/logo.svg`;

  return {
    title: `${post.title} | Zirachi Foundation Blog`,
    description: post.category || `Read about ${post.title} on Zirachi Foundation blog.`,
    keywords: [post.category, post.author, 'special needs', 'Africa', 'children', 'support'],
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.category || `Read about ${post.title}`,
      publishedTime: post.publishedDate,
      authors: [post.author],
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.category || `Read about ${post.title}`,
      images: [postImage],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="mb-5 leading-relaxed text-gray-700">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>
      ),
      [BLOCKS.QUOTE]: (node: any, children: any) => (
        <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-600 my-5">
          {children}
        </blockquote>
      ),
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 underline"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="bg-white">
      <Header variant="solid" />
      <main id="main-content" className="max-w-[900px] mx-auto px-5 pt-52 max-[768px]:pt-32 pb-20 bg-white w-full">
        {/* Hero */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        <div className="flex items-center gap-4 mb-10 text-sm text-gray-500">
          {post.authorImage && (
            <Image
              src={post.authorImage.url}
              alt={post.author}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          )}
          <span>
            {post.author} · {post.category} ·{" "}
            {new Date(post.publishedDate).toLocaleDateString()}
          </span>
        </div>

        {post.featuredImage && (
          <div className="mb-10">
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              width={900}
              height={500}
              className="rounded-2xl w-full object-cover"
              unoptimized
              priority
            />
          </div>
        )}

        <article className="prose prose-lg max-w-none">
          {documentToReactComponents(post.body, options)}
        </article>
      </main>
      <Footer />
    </div>
  );
}