import React, { useState, FC, ComponentType } from 'react';
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
  setLoading?: (loading: boolean) => void;
}

export const withLoading =
  <P extends object>(
    WrappedComponent: ComponentType<P & withLoadingProps>,
  ) =>
  ({ ...props }: P) => {
    const [isLoading, setIsLoading] = useState(true);

    const setLoadingState = (
      isComponentLoading: boolean,
    ) => {
      setIsLoading(isComponentLoading);
    };

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
            setLoading={setLoadingState}
          />
        </div>
        {isLoading && <AnimationLoader />}
      </>
    );
  };
