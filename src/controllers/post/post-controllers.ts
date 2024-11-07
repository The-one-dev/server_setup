import { ResponseObject } from "../../utilities/interfaces/global-interface";
import {
  catchMiddlewareErrors,
  sendResponse,
} from "../../utilities/functions/global-utilities";
import { RESPONSES } from "../../utilities/constants/responses.constant";
import { postServices } from "../../services/posts/post-services";
import { ERRORS } from "../../utilities/constants/errors.constant";
import createError from "http-errors";

const createPost = catchMiddlewareErrors(async (req, res, next) => {
  const validPostPayload = { ...req.validPostPayload };
  const createdPost = await postServices.savePost(validPostPayload);
  const response: ResponseObject = {
    statusCode: 201,
    message: RESPONSES.postCreated,
    data: {
      post: createdPost,
    },
  };
  return sendResponse(res, response);
});

const getAllPosts = catchMiddlewareErrors(async (req, res, next) => {
  const allPosts = await postServices.getAllPosts();

  if (allPosts.length <= 0) {
    throw new createError.NotFound(ERRORS.noPostFound);
  }
  const response: ResponseObject = {
    statusCode: 200,
    message: RESPONSES.postsRetrieved,
    data: {
      posts: allPosts,
    },
  };
  return sendResponse(res, response);
});

const deletePost = catchMiddlewareErrors(async (req, res, next) => {
  const id = Number(req.params.id);
  const userId = req.user.id;
  const deletedCount = await postServices.deletePost({ id, userId });
  if (deletedCount === 0) {
    throw new createError.NotFound(ERRORS.noPostFound);
  }
  const response: ResponseObject = {
    statusCode: 204,
  };
  return sendResponse(res, response);
});

const getAPost = catchMiddlewareErrors(async (req, res, next) => {
  const id = Number(req.params.id);
  const userId = req.user.id;
  const post = await postServices.findPostByIdAndUserId({ id, userId });
  if (!post) {
    throw new createError.NotFound(ERRORS.noPostFound);
  }
  const response: ResponseObject = {
    statusCode: 200,
    message: RESPONSES.postsRetrieved,
    data: {
      post,
    },
  };

  return sendResponse(res, response);
});

const updateAPost = catchMiddlewareErrors(async (req, res, next) => {
  const id = Number(req.params.id);
  const userId = Number(req.user.id);
  const postUpdate = { ...req.validPostPayload };
  const updatedPost = await postServices.updatePost({ id, userId, postUpdate });
  if (!updatedPost) {
    throw new createError.NotFound(ERRORS.noPostFound);
  }
  const response: ResponseObject = {
    statusCode: 201,
    message: RESPONSES.postUpdated,
    data: {
      post: updatedPost,
    },
  };
  return sendResponse(res, response);
});

export const postControllers = {
  createPost,
  getAllPosts,
  deletePost,
  getAPost,
  updateAPost,
};
