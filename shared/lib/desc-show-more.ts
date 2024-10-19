export const descShowMore = (desc: string, isDescMore: boolean) => {
  if (desc.length > 208 && isDescMore) {
    return desc.slice(0, 208);
  } else if (!isDescMore) {
    return desc;
  }
};
