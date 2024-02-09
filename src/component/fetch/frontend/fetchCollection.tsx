export const getCollections = async (id: string) => {
  const resp = await fetch(`/api/collection?id=${id}`);
  if (resp && resp.ok) {
    return await resp.json();
  }
  return resp;
};
