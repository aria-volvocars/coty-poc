export const getBrands = async () => {
  const resp = await fetch(`/api/brand`);
  if (resp && resp.ok) {
    return await resp.json();
  }
  return resp;
};
