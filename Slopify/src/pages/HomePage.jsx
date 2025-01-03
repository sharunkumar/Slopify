import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function HomePage() {
  return (
    <>
    <h1>Slopify</h1>
    <div className="home-page">
      <div className="form-container">
        <LoginForm />
      </div>

      <div className="form-container">
        <RegisterForm />
      </div>
    </div>
    </>
  );
}
