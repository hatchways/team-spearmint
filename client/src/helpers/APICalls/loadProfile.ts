import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';

const loadProfile = async (id: string | undefined): Promise<Profile> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id),
    credentials: 'include',
  };
  return await fetch(`/profile/load`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to load profile' },
    }));
};

export default loadProfile;
