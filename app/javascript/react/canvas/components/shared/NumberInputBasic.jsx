import * as React from 'react';
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: '+',
        },
        decrementButton: {
          children: '-',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputBasic() {
  const [value, setValue] = React.useState(null);
  return (
    <NumberInput
      aria-label="Demo number input"
      placeholder="Type a number…"
      value={value}
      onChange={(event, val) => setValue(val)}
      style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}
    />
  );
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};


const StyledInputRoot = styled('div')(
  ({ theme }) => `  
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${grey[900]};
  background: #fff;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 20px auto 20px;
  justify-content: center;
  item-align: center;
  overflow: hidden;
  column-gap: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
  ({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 2/3;
  color: ${grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 2px 10px;
  outline: 0;
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
  line-height: 1;
  box-sizing: border-box;
  background: #fff;
  border: 0.5px solid ${grey[600]};
  color: ${grey[900]};
  transition: background 120ms cubic-bezier(0.4, 0, 0.2, 1), border-color 120ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${grey[50]};
    border-color: ${grey[700]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 3/4;
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 1/2;
  }
`,
);
