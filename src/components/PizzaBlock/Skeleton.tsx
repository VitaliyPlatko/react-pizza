import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
    <ContentLoader 
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f8f8e2"
        foregroundColor="#ffffff"
    >
        <rect x="0" y="330" rx="10" ry="10" width="280" height="80" /> 
        <rect x="0" y="277" rx="10" ry="10" width="280" height="21" /> 
        <rect x="5" y="440" rx="10" ry="10" width="95" height="30" /> 
        <rect x="126" y="440" rx="25" ry="25" width="152" height="45" /> 
        <circle cx="132" cy="127" r="107" /> 
        <circle cx="152" cy="164" r="7" />
    </ContentLoader>
)

export default MyLoader