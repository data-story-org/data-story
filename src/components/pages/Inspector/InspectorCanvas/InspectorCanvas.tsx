import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
} from 'react';

export const InspectorCanvas = ({ features }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'red';
    features.forEach((feature) => {
      context.fillRect(
        feature.get('x'),
        feature.get('y'),
        1,
        1,
      );
    });
  });

  return (
    <canvas className="p-4 w-full h-full" ref={canvasRef} />
  );
};
