import { FetchOptions } from '../../interface/FetchOptions';

const deletePhoto = async (key: string | undefined | null, profileId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: profileId }),
    credentials: 'include',
  };
  console.log('in delete Photo, this is', key, 'this is', profileId);
  return await fetch(`/deleteImage/${key}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default deletePhoto;
