import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Checkbox, HelperText, Label, TextInput } from "flowbite-react";

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Add login API call here
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="min-w-lg">
        <h3 className="dark:text-white text-2xl">Login</h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email">Your email</Label>
            </div>
            <TextInput 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
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
