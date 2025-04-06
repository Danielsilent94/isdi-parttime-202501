import Logo from "../../components/lib/Logo"
import "./Landing.css"

const Landing = () => {
    return <div className="landing__content">
        <h1 className="landing__title">🔥BURGUER BLISS🔥</h1>
        <Logo size={"lg"} />
        <h2 className="landing__subtitle">Where every bite is a flavor explosion</h2>
    </div>
}

export default Landing