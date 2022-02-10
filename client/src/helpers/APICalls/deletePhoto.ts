import { FetchOptions } from '../../interface/FetchOptions';

const deletePhoto = async (key: string | undefined | null, profileId: string) => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: profileId }),
    credentials: 'include',
  };

  return await fetch(`/deleteImage/${key}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default deletePhoto;
