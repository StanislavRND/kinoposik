type Props = {
  name: string;
};

export const FragmentationFullName = ({ name }: Props) => {
  const [lastName, firstName] = name.split(' ');

  return (
    <div>
      <div className="slider__actors-actor-name">{lastName}</div>
      <div className="slider__actors-actor-name">{firstName}</div>
    </div>
  );
};
