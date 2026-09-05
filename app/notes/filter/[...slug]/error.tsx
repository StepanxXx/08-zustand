'use client';

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return (
    <div>
      <h1>Error in notes by category page</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
