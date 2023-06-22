import "./styles.css";
import { Link, useParams } from "react-router-dom";
import { RamroInput, RamroSelect } from "../../components/RamroInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    email: "",
    dob: "",
    phone: "",
    district: "",
    city: "",
    province: "Province 1",
    country: "Nepal",
  });
  const [isEdit, setIsEdit] = useState(!!id);

  useEffect(() => {
    if (isEdit) {
      const userData = JSON.parse(localStorage.getItem("formData")) ?? [];
      const user = userData.find((el) => el.id == id);
      setFormData(user);
    }
  }, [isEdit, id]);

  const isEmpty = (val) => !val || val.length < 0 || val === "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errorMessages = [];

    const { name, email, phone, district, city, province, country } = formData;

    //validate fields
    if (isEmpty(name)) {
      errorMessages.push("The name field is required.");
    }

    if (isEmpty(email)) {
      errorMessages.push("The email field is required.");
    }

    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      errorMessages.push("The email is invalid.");
    }

    if (isEmpty(phone)) {
      errorMessages.push("The phone field is required.");
    } else {
      if (phone.length < 7) {
        errorMessages.push("The phone field must have 7 digits.");
      }
    }

    setErrors(errorMessages);

    if (errorMessages.length === 0) {
      // Retrieve existing data from local storage or initialize an empty array
      const storedData = JSON.parse(localStorage.getItem("formData")) || [];
      if (!isEdit) {
        // Push the new object to the existing data array
        storedData.push(formData);
        // Update the local storage with the updated array
        localStorage.setItem("formData", JSON.stringify(storedData));
      } else {
        const updatedData = storedData.map((el) =>
          el.id == id
            ? {
                ...formData,
              }
            : el
        );
        localStorage.setItem("formData", JSON.stringify(updatedData));
      }

      navigate("/");
    }
  };
  return (
    <div>
      <Link to={`/`}>
        <button>Go back</button>
      </Link>

      <div className="card-form">
        <div className="">
          {errors.length > 0 ? (
            <div className="errors">
              {errors.map((el, id) => (
                <div key={id} className="error-heading">
                  {el}
                </div>
              ))}
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <RamroInput
              label="Name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              handleChange={handleChange}
            ></RamroInput>

            <RamroInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              handleChange={handleChange}
            />

            <RamroInput
              type="date"
              label="Date of Birth"
              name="dob"
              placeholder="Enter your date of birth"
              value={formData.dob}
              handleChange={handleChange}
            ></RamroInput>

            <RamroInput
              type="number"
              label="Phone"
              name="phone"
              placeholder="Enter your phone"
              value={formData.phone}
              handleChange={handleChange}
            ></RamroInput>

            <div className="">
              <label htmlFor="address">Address</label>
              <RamroInput
                label="City"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                handleChange={handleChange}
              ></RamroInput>

              <RamroInput
                label="District"
                name="district"
                placeholder="Enter your district"
                value={formData.district}
                handleChange={handleChange}
              />

              <RamroSelect
                label="Province"
                name="province"
                placeholder="Enter your province"
                value={formData.province}
                handleChange={handleChange}
                options={[
                  {
                    label: "Province 1",
                    value: "Province 1",
                  },
                  {
                    label: "Province 2",
                    value: "Province 2",
                  },
                  {
                    label: "Province 3",
                    value: "Province 3",
                  },
                  {
                    label: "Province 4",
                    value: "Province 4",
                  },
                  {
                    label: "Province 5",
                    value: "Province 5",
                  },
                  {
                    label: "Province 6",
                    value: "Province 6",
                  },
                  {
                    label: "Province 7",
                    value: "Province 7",
                  },
                ]}
              />

              <RamroSelect
                label="Country"
                name="country"
                placeholder="Enter your name"
                value={formData.country}
                handleChange={handleChange}
                options={[
                  {
                    label: "Nepal",
                    value: "Nepal",
                  },
                  {
                    label: "USA",
                    value: "USA",
                  },
                  {
                    label: "Canada",
                    value: "Canada",
                  },
                ]}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientForm;
