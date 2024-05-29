import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function updatePostHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { postId, newTitle, newContent, newImage } = req.body;
  const updateData: Record<string, any> = {};
  if (newTitle) updateData.title = newTitle;
  if (newContent) updateData.content = newContent;
  if (newImage) updateData.image = newImage;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: updateData,
    });

    res.status(200).json({ message: 'Post updated successfully', updatedPost });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
