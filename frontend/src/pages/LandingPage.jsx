import { Link } from 'react-router-dom';


function LandingPage() {

  return (

    <div className="container text-center mt-5">

      <h1 className="display-4 mb-4">
        Video Collaboration Platform 🎬
      </h1>

      <p className="lead mb-5">
        Edit, collaborate, and review videos
        in one unified workspace.
      </p>

      <div className="d-flex justify-content-center gap-3">

        <Link
          to="/signin"
          className="btn btn-primary btn-lg"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="btn btn-outline-dark btn-lg"
        >
          Register
        </Link>

      </div>

    </div>
  );
}


export default LandingPage;