export const getProductDetail = async (id: string) => {
  const resp = await fetch(`/api/product/detail?id=${id}`);
  if (resp && resp.ok) {
    return await resp.json();
  }
  return resp;
};
