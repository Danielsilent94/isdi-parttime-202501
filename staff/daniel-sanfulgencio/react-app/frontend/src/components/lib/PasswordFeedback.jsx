import { useState } from "react"
import Btn from "./Btn"
import "./PasswordFeedback.css"

const PasswordFeedback = ({ securityPasswordErrors, arePasswordsEqual }) => {
    const [showCompleteFeedback, setShowCompleteFeedback] = useState(false)
    return <div className="password-feedback">
        {(arePasswordsEqual !== null && arePasswordsEqual === false) &&
            <div className="password-feedback__match">
                Passwords do not match.
            </div>
        }
        <div className="password-feedback__color">
            <div className={securityPasswordErrors.length > 2 ? 'color red' :
                securityPasswordErrors.length > 0 ? 'color yellow' :
                    'color green'
            }></div>
        </div>
        {securityPasswordErrors.length > 0 && <Btn btnCallback={() => setShowCompleteFeedback(!showCompleteFeedback)} btnClassnames={'password-feedback__btn'} btnContent={<i className="bi bi-info-circle"></i>} />}
        {(securityPasswordErrors.length > 0 && showCompleteFeedback) && <div className="password-feedback__text">
            <p>A really good password... </p>
            <ul className="password-feedback__text-list">
                {
                    securityPasswordErrors && securityPasswordErrors.map((errorMessage, index) => {
                        return <li className="password-feedback__text-item" key={index}>{errorMessage}</li>
                    })
                }
            </ul>
        </div>}
    </div>
}

export default PasswordFeedback