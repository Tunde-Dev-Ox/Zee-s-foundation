"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header/page";
import Footer from "@/app/components/footer/page";
import { FaArrowRight } from "react-icons/fa";
import {
  containerVariants,
  fadeInUp,
  fadeInRight,
  viewportSettings,
} from "@/lib/utils/motionConfig";

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

const POSTS_PER_PAGE = 6;

export default function BlogClient({
  posts,
  searchParams,
}: {
  posts: BlogPost[];
  searchParams?: { page?: string };
}) {
  const page = parseInt(searchParams?.page || "1");
  const totalPages = Math.ceil((posts.length - 1) / POSTS_PER_PAGE);
  const featuredPost = posts[0];
  const paginatedPosts = posts.slice(
    1 + (page - 1) * POSTS_PER_PAGE,
    1 + page * POSTS_PER_PAGE
  );

  return (
    <>
      <Header variant="solid" />

      <main id="main-content" className="bg-white">
        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center text-center max-w-[900px] mx-auto pt-52 pb-10 px-5 max-[768px]:pt-32">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Insights & Stories
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl"
          >
            Stories and updates from our mission to empower children with
            special needs across Africa.
          </motion.p>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="max-w-[1200px] mx-auto px-5 pb-16"
          >
            <Link
              href={`/blog/${featuredPost.fields.slug}`}
              className="flex flex-col md:flex-row gap-8 bg-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {featuredPost.fields.featuredImage && (
                <Image
                  src={`https:${featuredPost.fields.featuredImage.fields.file.url}`}
                  alt={featuredPost.fields.title}
                  width={700}
                  height={500}
                  className="object-cover w-full md:w-1/2 h-64 md:h-auto"
                />
              )}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-3">
                  {featuredPost.fields.title}
                </h2>
                <p className="text-gray-600 mb-5 line-clamp-3">
                  Read more about our work, stories, and community insights.
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  {featuredPost.fields.category} ·{" "}
                  {new Date(
                    featuredPost.fields.publishedDate
                  ).toLocaleDateString()}
                </p>
                <span className="text-green-700 font-medium flex items-center gap-2 hover:underline">
                  Read More <FaArrowRight />
                </span>
              </div>
            </Link>
          </motion.section>
        )}

        {/* Blog Grid */}
        <motion.section
          variants={containerVariants}
          animate="visible"
          viewport={viewportSettings}
          className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-5 pb-16"
        >
          {paginatedPosts.map((post, index) => (
            <motion.div
              key={post.sys.id}
              variants={fadeInRight}
              transition={{ delay: index * 0.15 }}
              className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <Link href={`/blog/${post.fields.slug}`}>
                {post.fields.featuredImage && (
                  <Image
                    src={`https:${post.fields.featuredImage.fields.file.url}`}
                    alt={post.fields.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-56"
                  />
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {post.fields.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    Read more about our work, stories, and community insights.
                  </p>
                  <div className="mt-auto">
                    <p className="text-xs text-gray-400 mb-2">
                      {post.fields.category} ·{" "}
                      {new Date(
                        post.fields.publishedDate
                      ).toLocaleDateString()}
                    </p>
                    <div className="text-green-700 font-medium hover:underline flex items-center gap-2">
                      Read More
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 pb-24">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i + 1}
                href={`/blog?page=${i + 1}`}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  page === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
