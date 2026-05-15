// src/components/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Checkbox, HelperText, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/AuthApi";

export function Login() {
  const navigate = useNavigate();
  // Changed email to username
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(""); // To show backend errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) setErrors({ ...errors, [e.target.id]: null });
    setApiError(""); 
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Match the backend property names (userName)
        const response = await loginUser({ 
            userName: formData.username, 
            password: formData.password 
        });
        
        // Save token and redirect
        localStorage.setItem("token", response.data.token);
        console.log("Logged in successfully!");
        navigate("/"); 

      } catch (error) {
        // Display error message from backend
        setApiError(error.response?.data?.message || "Something went wrong logging in.");
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="min-w-lg">
        <h3 className="dark:text-white text-2xl">Login</h3>
        
        {apiError && <HelperText color="failure" className="text-center text-lg">{apiError}</HelperText>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block"><Label htmlFor="username">Username</Label></div>
            <TextInput 
              id="username" 
              type="text" 
              placeholder="Your username" 
              value={formData.username}
              onChange={handleChange}
              color={errors.username ? "failure" : "gray"}
            />
            {errors.username && <HelperText color="failure">{errors.username}</HelperText>}
          </div>

          <div>
            <div className="mb-2 block"><Label htmlFor="password">Your password</Label></div>
            <TextInput 
              id="password" 
              type="password" 
              value={formData.password}
              onChange={handleChange}
              color={errors.password ? "failure" : "gray"}
            />
            {errors.password && <HelperText color="failure">{errors.password}</HelperText>}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          
          <Button type="submit">Submit</Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-cyan-700 hover:underline dark:text-cyan-400"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
