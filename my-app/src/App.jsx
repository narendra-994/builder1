import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import UserForm from "../components/UserForm";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}  {country.pincode}</li>

      ))}
      <UserForm></UserForm>
    </ul>
    
  );
}

export default App;