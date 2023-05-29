const ApiPath = {
  videoCreate: '/video/create',
  videoList: '/video/list',
  videoById: '/video/load?id=',
  videoDelete: '/video/delete',
  genreList: '/genre/list',
  signIn: './auth/signin',
  signUp: '/auth/signup',
  commentList: '/comment/list?video_id=',
  commentCreate: '/comment/create',
  commentUpdate: '/comment/update',
  commentDelete: '/comment/delete',
  userUpdate: '/user/update',
  userGet: '/user/get?id=',
  ratingCreate: '/rating/create',
  ratingGet: '/rating/get?video_id=',
  ratingUpdate: '/rating/update',
  ratingList: '/rating/list',
  ratingDelete: '/rating/delete',
  verificationCreate: '/verification/create',
  verificationList: '/verification/list',
  verificationGet: '/verification/get?id=',
  verificationDelete: '/verification/delete'
}

export { ApiPath }