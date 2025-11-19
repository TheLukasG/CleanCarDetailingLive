import React from "react";

const PageTemplate = ({ pageContext }) => {
    const { title } = pageContext;
    return (
        <div>
            <h1>{title}</h1>
            <p>Inhalt der Seite hier</p>
        </div>
    );
};

export default PageTemplate;
