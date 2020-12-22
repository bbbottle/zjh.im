export const isPc = () => {
  const { matches: isPc } = matchMedia('(min-width: 500px)'); // Not sure about that~
  return isPc;
}

export const IS_PC = isPc();