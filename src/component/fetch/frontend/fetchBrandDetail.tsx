export const getBrandDetail = async (id: string) => {
  const resp = await fetch(`/api/brand/detail?id=${id}`);
  if (resp && resp.ok) {
    return await resp.json();
  }
  return resp;
};
