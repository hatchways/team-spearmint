import { RequestApiData } from '../../interface/RequestApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const getSitterRequests = async (id: string): Promise<RequestApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/request/sitter/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getSitterRequests;
