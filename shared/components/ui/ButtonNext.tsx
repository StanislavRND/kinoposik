import { CircularProgress } from '@mui/material';

type Props = {
  isButtonDisabled: boolean;
  isLoading: boolean;
};

export const ButtonNext = ({ isButtonDisabled, isLoading }: Props) => {
  return (
    <button
      className="button__next"
      style={
        isButtonDisabled
          ? { backgroundColor: '#b09810', cursor: 'not-allowed' }
          : { backgroundColor: '#fddd2d' }
      }
      disabled={isButtonDisabled}>
      {isLoading ? (
        <CircularProgress
					size={24}
          sx={{
            color: '#343434',
          }}
        />
      ) : (
        'Продолжить'
      )}
    </button>
  );
};
