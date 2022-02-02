import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { User } from '../../interface/User';

const uploadPhoto = async (data: FormData, user: User | undefined): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: data,
    credentials: 'include',
  };
  return await fetch(`/uploadImage/${user?.id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadPhoto;
