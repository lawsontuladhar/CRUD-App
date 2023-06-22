import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("formData")) ?? []
  );

  return (
    <div>
      <div className="h2">Profile</div>
      <div className="row">
        {data.map((el) => (
          <div className="card" key={el.id}>
            <div className="">{el.name}</div>
            <div className="">{el.email}</div>
            <div className="">{el.phone}</div>
            <Link to={`/user/${el.id}/edit`}>Edit</Link>
          </div>
        ))}
      </div>
      
        <button onClick={()=>navigate(-1)}>Go Home</button>
      
    </div>
    
  );
}
export default Profile;
