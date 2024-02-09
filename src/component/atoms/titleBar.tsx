export const TitleBar = ({ title }: { title: string }) => {
  return (
    <h2 className="text-2xl text-black font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight mb-10">
      {title}
    </h2>
  );
};
