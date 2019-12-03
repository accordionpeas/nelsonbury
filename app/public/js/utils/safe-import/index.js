const safeImport = (fnc) => {
  try {
    return fnc();
  } catch (err) {
    return undefined;
  }
};

export default safeImport;
