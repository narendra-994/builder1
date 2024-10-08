import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
function UserForm() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pincode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, address, pincode } = formData;

        // Insert data into Supabase table
        const { error } = await supabase
            .from('profiles')
            .insert([{ name, address, pincode }]);

        if (error) {
            alert('Error inserting data');
            console.error(error);
        } else {
            alert('Data submitted successfully');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={formData.name} 
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                value={formData.address} 
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="pincode" 
                placeholder="Pincode" 
                value={formData.pincode} 
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default UserForm;
