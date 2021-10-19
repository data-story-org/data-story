import React, {
  useState,
  FC,
  ComponentType,
  Dispatch,
  SetStateAction,
} from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import FadeIn from 'react-fade-in';

export const AnimationLoader = () => {
  return (
    <div className="loading-wrapper" id="loading">
      <FadeIn>
        <ScaleLoader color="lightgray" />
      </FadeIn>
    </div>
  );
};

export interface withLoadingProps {
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

export const withLoading =
  <P extends object>(
    WrappedComponent: ComponentType<P & withLoadingProps>,
  ) =>
  ({ ...props }: P) => {
    const [isLoading, setIsLoading] = useState(true);

    const loadingStyle = {
      filter: 'blur(3px)',
    };

    isLoading
      ? (document.body.style.cursor = 'progress')
      : (document.body.style.cursor = '');

    return (
      <>
        <div style={isLoading ? loadingStyle : {}}>
          <WrappedComponent
            {...(props as P)}
            setLoading={setIsLoading}
          />
        </div>
        {isLoading && <AnimationLoader />}
      </>
    );
  };
