import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, HelperText, Label, TextInput } from "flowbite-react";

export function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    const usernameRegex = /^[a-zA-Z0-9]+$/; 
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = "Username must be between 3 and 20 characters";
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = "Letters and numbers only (no spaces allowed)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const noSpaceRegex = /^\S+$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8 || formData.password.length > 25) {
      newErrors.password = "Password must be between 8 and 25 characters";
    } else if (!noSpaceRegex.test(formData.password)) {
      newErrors.password = "Password cannot contain spaces";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    
    if (isValid) {
      // TODO: Add your fetch/axios request to your Express backend here
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="min-w-lg">
        <h3 className="dark:text-white text-2xl">Register</h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username">Username</Label>
            </div>
            <TextInput 
              id="username" 
              type="text" 
              value={formData.username}
              onChange={handleChange}
              color={errors.username ? "failure" : "gray"}
              
                      />
                                                        {errors.username && <HelperText color="failure">{errors.username}</HelperText>}

          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email">Your email</Label>
            </div>
            <TextInput 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              color={errors.email ? "failure" : "gray"}
                      />
              {errors.email && <HelperText color="failure">{errors.email}</HelperText>}

          </div>
          
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">Your password</Label>
            </div>
            <TextInput 
              id="password" 
              type="password" 
              value={formData.password}
              onChange={handleChange}
              color={errors.password ? "failure" : "gray"}
                      />
                                                        {errors.password && <HelperText color="failure">{errors.password}</HelperText>}

          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword">Repeat password</Label>
            </div>
            <TextInput 
              id="confirmPassword" 
              type="password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              color={errors.confirmPassword ? "failure" : "gray"}
                      />
                                  {errors.confirmPassword && <HelperText color="failure">{errors.confirmPassword}</HelperText>}

            </div>

          <Button type="submit">Submit</Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-cyan-700 hover:underline dark:text-cyan-400"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
