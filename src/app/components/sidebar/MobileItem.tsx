const MobileItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
          group 
          flex 
          gap-x-3 
          text-sm 
          leading-6 
          font-semibold 
          w-full 
          justify-center 
          px-4 
          "
    >
      {children}
    </div>
  );
};

export default MobileItem;
