import ClientTable from "../../components/ClientTable";
import "./styles.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="homeContainer">
        <div className="homeHeader">
          <Link to={"/user/create"}>
            <button>Add New User</button>
          </Link>
        </div>
        <div>
          <ClientTable />
          <Link to="/profile" >
            <button className="profile">
              Profile
            </button>
            </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
