import { FetchOptions } from '../../interface/FetchOptions';

export async function getProfiles() {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch('/profile/profiles', fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
