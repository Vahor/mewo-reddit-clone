export const convertUserDbToUser = ({
  name,
  username,
  picture_url: profilePicture,
}) => ({
  name,
  username,
  profilePicture,
});
