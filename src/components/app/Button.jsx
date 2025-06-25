import { RiLoader5Line } from "react-icons/ri";

const Button = ({ text, onClick, loading, type }) => {
  return (
    <div>
      <button
        disabled={loading}
        type={type}
        onClick={onClick}
        className="bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] rounded-[8px] w-full text-white font-[500] text-[16px] h-[49px]"
      >
        <div className="flex justify-center items-center">
          <span className="mr-1">{text}</span>
          {loading && <RiLoader5Line className="animate-spin text-lg" />}
        </div>
      </button>
    </div>
  );
};

export default Button;
