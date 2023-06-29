import { Link } from "react-router-dom"
type Props = {}
export default function NavBar({}: Props) {
  return (
    <nav>
        <Link to="/login">login</Link>&emsp;
        <Link to="/register">register</Link>&emsp;
        <Link to="/">recipes</Link>&emsp;
        <Link to="/editprofile">Edit Profile</Link>&emsp;
        <Link to="/createrecipe">Create Recipe</Link>&emsp;
        <Link to="/editrecipe">Edit Recipe</Link>
    </nav>
  )
}