import React from 'react';

interface Props {
  setGrade: React.Dispatch<React.SetStateAction<number>>;
  handleRateMedia: (newGrade: number) => void;
  score: number | undefined;
  setActiveScore: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const ModalGrade: React.FC<Props> = ({
  setGrade,
  handleRateMedia,
  score,
  setActiveScore,
}) => {
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleClick = (el: number) => {
    setGrade(el);
    handleRateMedia(el);
    setActiveScore(el);
  };

  return (
    <div className="full-film__detail-grades">
      {grades.map((el) => (
        <div
          onClick={() => handleClick(el)}
          className={`full-film__detail-grades-number ${el === score ? 'selected' : ''}`}
          key={el}>
          {el}
        </div>
      ))}
    </div>
  );
};
