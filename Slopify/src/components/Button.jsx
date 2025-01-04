export default function Button(data) {
  return (
    <>
      <button
        style={{ backgroundColor: data.background, color: data.color }}
        type={data.action}
      >
        {data.content}
      </button>
    </>
  );
}
