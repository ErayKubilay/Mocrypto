import React, { useState } from "react";

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="tabs-container">
            <div className="tab-headers">
                {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={`tab-header ${activeTab === index ? "active" : ""}`}
                    onClick={() => setActiveTab(index)}
                >
                    {tab.label}
                </div>
                ))}
            </div>

            <div className="tab-content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;
