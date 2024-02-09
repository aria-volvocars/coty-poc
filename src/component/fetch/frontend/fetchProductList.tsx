export const getProducts = async (id: string) => {
  const resp = await fetch(`/api/product?id=${id}`);
  if (resp && resp.ok) {
    return await resp.json();
  }
  return resp;
};
