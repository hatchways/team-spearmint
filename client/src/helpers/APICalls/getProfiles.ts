import { FetchOptions } from '../../interface/FetchOptions';

export async function getProfiles(location: string | undefined, dates: string | undefined) {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/sitters?location=${location}&dates=${dates}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
