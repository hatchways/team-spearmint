import { FetchOptions } from '../../interface/FetchOptions';

const makeActiveSchedule = async (id: string) => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    credentials: 'include',
  };
  return await fetch(`/availability/${id}/activate`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default makeActiveSchedule;
