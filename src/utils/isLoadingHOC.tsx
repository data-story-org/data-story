import React, { useState, FC, ComponentType } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import FadeIn from 'react-fade-in';

export const AnimationLoader = () => {
  return (
    <div className="loading-wrapper" id="loading">
      <FadeIn>
        <ScaleLoader color="#000000" />
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

    const blur = {
      filter: 'blur(3px)',
    };

    return (
      <>
        <div style={isLoading ? blur : {}}>
          <WrappedComponent
            {...(props as P)}
            setLoading={setLoadingState}
          />
        </div>
        {isLoading && <AnimationLoader />}
      </>
    );
  };
