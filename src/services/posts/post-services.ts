import createError from "http-errors";
import { PostAttributes } from "../../models/model-interfaces";
import { ERRORS } from "../../utilities/constants/errors.constant";
import { Post } from "../../models/associations";

const findPostById = async (id: number): Promise<Post | null> => {
  return await Post.findOne({ where: { id } });
};

const findPostByIdAndUserId = async (filter: {
  id: number;
  userId: number;
}): Promise<Post | null> => {
  return await Post.findOne({ where: filter });
};

const savePost = async (payload: PostAttributes): Promise<Post> => {
  return await Post.create(payload);
};

const deletePost = async (filter: {
  id: number;
  userId: number;
}): Promise<number | null> => {
  return await Post.destroy({ where: filter });
};

const getAllPosts = async (): Promise<Post[] | []> => {
  return await Post.findAll();
};

const updatePost = async (filter: {
  id: number;
  userId: number;
  postUpdate: PostAttributes;
}): Promise<Post> => {
  console.log("these are the filters id, userid", filter.id, filter.userId);
  const post = await findPostByIdAndUserId({
    id: filter.id,
    userId: filter.userId,
  });
  if (!post) {
    throw new createError.NotFound(ERRORS.noPostFound);
  }
  return await post.update(filter.postUpdate);
};

export const postServices = {
  getAllPosts,
  deletePost,
  findPostByIdAndUserId,
  findPostById,
  savePost,
  updatePost,
};
