import { Document } from '@contentful/rich-text-types';
import type { Asset, Entry, EntrySkeletonType } from 'contentful';

export interface BlogPostFields {
  title: string;
  slug: string;
  author: string;
  category: string;
  featuredImage?: Asset;
  authorImage?: Asset;
  publishedDate?: string;
  body: Document;
}

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'ngoblog';
  fields: BlogPostFields;
}

export type ContentfulBlogPost = Entry<BlogPostSkeleton>;

import { Node } from '@contentful/rich-text-types';

export type NodeRenderer = {
  [key: string]: (node: Node, children: React.ReactNode) => React.ReactElement;
};