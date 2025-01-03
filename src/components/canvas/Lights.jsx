const Lights = () => {
  return (
    <>
      <directionalLight intensity={2} />;
      <directionalLight intensity={1} position={[0, -5, 0.5]} />;
      <ambientLight intensity={0.3} />
    </>
  );
};

export default Lights;
