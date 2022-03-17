import { FetchOptions } from '../../interface/FetchOptions';

export async function getProfiles(
  location: string | undefined | null,
  startDate: string | undefined | null,
  endDate: string | undefined | null,
) {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/sitters?location=${location}&startDate=${startDate}&endDate=${endDate}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
