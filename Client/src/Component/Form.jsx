import axios from "axios";
import { useEffect, useState } from "react";
const Form = () => {
  const [data, setData] = useState([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [municipalities, setMunicipalities] = useState([]);
  const [municipality, setMunicipality] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/address/provinces", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.data);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict(""); // Reset district
    setMunicipalities([]); // Reset municipalities
    setMunicipality(""); // Reset municipality
    const prov = e.target.value;

    axios
      .get(`http://localhost:4000/api/v1/address/provinces/${prov}/districts`, {
        withCredentials: true,
      })
      .then((res) => {
        setDistricts(res.data.districts);
      });
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setMunicipality("");
    const prov = province;
    const district = e.target.value;

    axios
      .get(
        `http://localhost:4000/api/v1/address/provinces/${prov}/districts/${district}/municipalities`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setMunicipalities(res.data.municipalities);
      });
  };
  const handleMunicipalityChange = (e) => {
    setMunicipality(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Provience</label>
        <br />
        <select name="" id="text" onChange={handleProvinceChange}>
          <option value="">select province</option>
          {data.map((prov, index) => (
            <option key={index} value={prov.province}>
              {prov.province}
            </option>
          ))}
        </select>

        <label htmlFor="district">District</label>
        <br />
        <select
          id="district"
          onChange={handleDistrictChange}
          disabled={!province}
        >
          <option value="">select District</option>
          {districts.map((dist, index) => (
            <option key={index} value={dist}>
              {dist}
            </option>
          ))}
        </select>
        <br />
        <select
          id="municipality"
          onChange={handleMunicipalityChange}
          disabled={!district}
        >
          <option value="">select Municipality</option>
          {municipalities.map((muni, index) => (
            <option key={index} value={muni}>
              {muni}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
