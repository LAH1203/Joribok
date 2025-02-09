import { useAtomValue } from 'jotai';
import { MouseEvent, useEffect } from 'react';

import useClosingState from '@/hooks/useClosingState';
import { userStateAtom } from '@/store';

import Login from './Login';
import Logoff from './Logoff';
import * as S from './index.styles';

const animationTime = 200;

export interface SliderProps {
  hideSlider: () => void;
}

const Slider = ({ hideSlider }: SliderProps) => {
  const { isLogin } = useAtomValue(userStateAtom);
  const { isClosing, close: closeSlider } = useClosingState(animationTime, hideSlider);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const preventBubbling = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.Dimmer onClick={closeSlider}>
      <S.Content
        className={isClosing ? 'close' : ''}
        animationTime={animationTime}
        onClick={preventBubbling}
      >
        <S.CloseButton onClick={closeSlider} />
        {isLogin ? <Login /> : <Logoff closeSlider={closeSlider} />}
      </S.Content>
    </S.Dimmer>
  );
};

export default Slider;
