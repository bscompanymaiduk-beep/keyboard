'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getPosts(page: number = 1, pageSize: number = 20) {
  try {
    const skip = (page - 1) * pageSize;
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.post.count(),
    ]);

    return { posts, total };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0 };
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function createPost(title: string, author: string, content: string) {
  try {
    const post = await prisma.post.create({
      data: {
        title,
        author,
        content,
      },
    });
    revalidatePath('/community');
    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
}
