import { RequestApiData } from '../../interface/RequestApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const changeStatus = async (
  accepted: boolean,
  declined: boolean,
  requestId: string,
  sitterId: string,
  avatar: string | undefined,
): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accepted, declined, requestId, sitterId, avatar }),
    credentials: 'include',
  };
  return await fetch(`/request/sitter`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default changeStatus;
