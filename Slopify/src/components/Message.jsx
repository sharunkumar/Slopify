export default function Message(data) {
  return (
    <>
      <div key={data.key} className="message">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong style={{ color: data.color }}>{data.name}</strong>
          <small>{data.date}</small>
        </div>
        <p style={{ margin: 0, marginTop: "0.5rem" }}>{data.message}</p>
      </div>
    </>
  );
}
