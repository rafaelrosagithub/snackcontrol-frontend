import React, {
  ComponentType,
  InputHTMLAttributes,
  useState,
  useRef,
  useCallback,
} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ComponentType<IconBaseProps>;
  isPassword?: boolean;
}

const Input: React.FC<IProps> = ({
  icon: Icon,
  isPassword = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setisFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = useCallback(() => {
    setisFocused(true);
  }, []);

  const handleInputBluer = useCallback(() => {
    setisFocused(false);

    setisFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={16} />}
      <input
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBluer}
        {...rest}
        type={showPassword ? 'text' : rest.type}
      />
      {isPassword &&
        (showPassword ? (
          <FaEyeSlash
            size={16}
            color="##6d7dac"
            onClick={() => setShowPassword(!showPassword)}
            className="icon-click"
          />
        ) : (
          <FaEye
            size={16}
            color="##6d7dac"
            onClick={() => setShowPassword(!showPassword)}
            className="icon-click"
          />
        ))}
    </Container>
  );
};

export default Input;
