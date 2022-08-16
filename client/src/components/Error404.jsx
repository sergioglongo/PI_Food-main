import { Link } from 'react-router-dom';
import React from 'react';

export default function Error404() {
    return (
        <div className="error-container">
            <h1 className="error404-h1">404</h1>
            <h2 className="error404-h2">Page Not Found</h2>
            <div className="error404-CTA-container">
                <Link to="/FoodHome/Recipes">
                    <button className="error404-CTA">
                        Go back to Home
                    </button>
                </Link>
            </div>
        </div>
    )
}
