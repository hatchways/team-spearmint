import { FetchOptions } from '../../interface/FetchOptions';

const changeStatus = async (requestId: string, newStatus: string): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newStatus }),
    credentials: 'include',
  };
  return await fetch(`/requests/${requestId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default changeStatus;
