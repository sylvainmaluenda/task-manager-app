export async function fetchWrapper<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, init);

  if (response.status === 204) {
    return undefined as T;
  }

  const result = await response.json();

  if (!response.ok) {
    const message = Array.isArray(result.message)
      ? result.message.join(", ")
      : result.message;

    throw new Error(message || `HTTP error ${response.status}`);
    // légère logique UI dans le wrapper pour éviter les abstractions de type new NestError
  }

  return result;
}
