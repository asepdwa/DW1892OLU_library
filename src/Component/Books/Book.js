import React from "react";
import { Link } from "react-router-dom";

export default function Book(props) {
  const { index, data, profile, handleDelete } = props;
  return (
    <div key={index} className="col-sm-3">
      {data.status !== "Approved" && (
        <div className="need-confirm">
          <p style={{ color: data.status === "Canceled" && "red" }}>
            {data.status}
          </p>
        </div>
      )}
      <div className="list-book">
        <Link to={`/Detail/${data.id}`}>
          <img src={data.thumbnailUrl} alt={data.title} />
        </Link>
        {profile && (
          <button
            onClick={() => handleDelete(data.id)}
            className="btn"
            style={{
              position: "absolute",
              top: 5,
              left: "73%",
              backgroundColor: "#555",
              color: "white",
              fontSize: 16,
              fontWeight: 600,
              padding: 2,
              width: 25,
              borderRadius: "100%",
              display: "block",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            {" "}
            X{" "}
          </button>
        )}
        <br />
        <h4 className="mt-4">{data.title}</h4>
        <p>{data.author.fullName}</p>
      </div>
    </div>
  );
}
