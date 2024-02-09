export const getCollectionDetail = async (id: string) => {
  const resp = await fetch(`/api/collection/detail?id=${id}`);
  if (resp && resp.ok) {
    return await resp.json();
  }
  return resp;
};
