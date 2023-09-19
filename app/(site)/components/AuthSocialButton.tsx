import {IconType} from "react-icons";
import React from "react";

interface AuthSocialButtonProps {
  label?: string;
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({label, icon: Icon, onClick}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full
        justify-center
        items-center
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-700
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:bg-gray-50
        focus:outline-offset-0
      ">
      <Icon />{label && <span className="ml-2">{label}</span>}
    </button>
  );
}

export default AuthSocialButton;
